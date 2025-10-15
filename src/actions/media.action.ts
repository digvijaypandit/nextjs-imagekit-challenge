"use server";

import {revalidatePath} from "next/cache";
import {cache} from "react";

import {auth} from "@clerk/nextjs/server";
import {SQL, and, count, desc, eq} from "drizzle-orm";

import {db} from "@/db";
import {
  CreateMediaParams,
  MediaQueryParams,
  SelectMediaModel,
  UpdateMediaParams,
  createMediaSchema,
  media,
  mediaQuerySchema,
  updateMediaSchema,
} from "@/db/schema/media";
import {handleError} from "@/lib/handlers";
import action from "@/lib/handlers/action";
import {PaginatedSearchParamsSchema} from "@/lib/schema";
import {PaginatedSearchParams} from "@/types";

// --- CREATE MEDIA ---
export const createMedia = async (
  params: CreateMediaParams
): Promise<ActionResponse<SelectMediaModel>> => {
  try {
    const {userId} = await auth();
    if (!userId) throw new Error("Unauthorized");

    const validationResult = await action({
      params,
      schema: createMediaSchema,
      authorize: true,
    });

    if (validationResult instanceof Error)
      return handleError(validationResult) as ErrorResponse;

    const {fileName, originalUrl, mediaType, transformationConfig} =
      validationResult.params!;

    const [newMedia] = await db
      .insert(media)
      .values({
        fileName,
        originalUrl,
        mediaType,
        transformationConfig,
        userId,
      })
      .returning();

    if (!newMedia) throw new Error("Failed to create media record");

    revalidatePath("/");

    return {success: true, data: newMedia};
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

// --- GET SINGLE MEDIA ---
export const getMedia = cache(
  async (
    params: MediaQueryParams
  ): Promise<ActionResponse<SelectMediaModel>> => {
    try {
      const {userId} = await auth();
      if (!userId) throw new Error("Unauthorized");

      const validationResult = await action({
        params,
        schema: mediaQuerySchema,
        authorize: true,
      });

      if (validationResult instanceof Error)
        return handleError(validationResult) as ErrorResponse;

      const {id} = validationResult.params!;

      const [mediaItem] = await db
        .select()
        .from(media)
        .where(and(eq(media.id, id), eq(media.userId, userId)))
        .limit(1);

      if (!mediaItem) throw new Error("Media not found");

      return {success: true, data: mediaItem};
    } catch (error) {
      return handleError(error) as ErrorResponse;
    }
  }
);

// --- GET ALL MEDIA FOR LOGGED-IN USER ---
export const getAllMedia = cache(
  async (
    params: PaginatedSearchParams
  ): Promise<ActionResponse<{media: SelectMediaModel[]; isNext: boolean}>> => {
    try {
      const {userId} = await auth();
      if (!userId) throw new Error("Unauthorized");

      const validationResult = await action({
        params,
        schema: PaginatedSearchParamsSchema,
        authorize: true,
      });

      if (validationResult instanceof Error)
        return handleError(validationResult) as ErrorResponse;

      const {page = 1, pageSize = 10, filter} = validationResult.params!;
      const skip = (Number(page) - 1) * pageSize;
      const limit = Number(pageSize);

      const whereCondition = [
        eq(media.userId, userId),
        filter
          ? eq(media.mediaType, filter.toUpperCase() as "IMAGE" | "VIDEO")
          : undefined,
      ].filter(Boolean);

      const conditions: SQL<unknown>[] = [eq(media.userId, userId)];

      const [totalResult] = await db
        .select({count: count()})
        .from(media)
        .where(and(...conditions));

      const totalCount = totalResult?.count || 0;

      const mediaItems = await db
        .select()
        .from(media)
        .where(and(...conditions))
        .orderBy(desc(media.createdAt))
        .offset(skip)
        .limit(limit);

      const isNext = totalCount > skip + limit;

      return {success: true, data: {media: mediaItems, isNext}};
    } catch (error) {
      return handleError(error) as ErrorResponse;
    }
  }
);

export const updateMedia = async (
  params: UpdateMediaParams
): Promise<ActionResponse<SelectMediaModel>> => {
  try {
    const {userId} = await auth();
    if (!userId) throw new Error("Unauthorized");

    const validationResult = await action({
      params,
      schema: updateMediaSchema,
      authorize: true,
    });

    if (validationResult instanceof Error)
      return handleError(validationResult) as ErrorResponse;

    const {id, transformedUrl, transformationConfig} = validationResult.params!;

    const [updatedMedia] = await db
      .update(media)
      .set({transformedUrl, transformationConfig})
      .where(and(eq(media.id, id), eq(media.userId, userId)))
      .returning();

    if (!updatedMedia) throw new Error("Media not found or failed to update");

    revalidatePath("/");
    revalidatePath(`/studio/${id}`);

    return {success: true, data: updatedMedia};
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};
