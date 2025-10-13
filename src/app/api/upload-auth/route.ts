import {NextResponse} from "next/server";

import {auth} from "@clerk/nextjs/server";
import {getUploadAuthParams} from "@imagekit/next/server";

import {env} from "@/env";

export async function GET(req: Request) {
  try {
    const {userId} = auth();

    if (!userId) {
      return NextResponse.json(
        {error: "You must be logged in to upload images."},
        {status: 401}
      );
    }

    // Generate ImageKit upload auth params
    const {token, expire, signature} = getUploadAuthParams({
      privateKey: env.IMAGEKIT_PRIVATE_KEY,
      publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    });

    return NextResponse.json({
      token,
      expire,
      signature,
      publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      userId,
    });
  } catch (error) {
    console.error("Upload auth error:", error);
    return NextResponse.json(
      {error: "Failed to generate upload authentication parameters"},
      {status: 500}
    );
  }
}
