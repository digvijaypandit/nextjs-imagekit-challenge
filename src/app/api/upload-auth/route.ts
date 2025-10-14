import {NextResponse} from "next/server";
import {NextRequest} from "next/server";

import {getAuth} from "@clerk/nextjs/server";
import {getUploadAuthParams} from "@imagekit/next/server";

import {env} from "@/env";

export async function GET(req: NextRequest) {
  try {
    const {userId} = getAuth(req);

    if (!userId) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const {token, expire, signature} = getUploadAuthParams({
      privateKey: env.IMAGEKIT_PRIVATE_KEY,
      publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    });

    return NextResponse.json({
      token,
      expire,
      signature,
      publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    console.error("Upload auth error:", error);
    return NextResponse.json(
      {error: "Failed to generate upload authentication parameters"},
      {status: 500}
    );
  }
}
