import { NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/s3";

export async function POST(request) {
  try {
    // ✅ Log AWS environment variables at request time
    console.log("FROM API (POST):", {
      AWS_REGION: process.env.AWS_REGION,
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ? "Loaded" : "Missing",
      AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    });

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const fileName = `${Date.now()}-${file.name}`;

    // Upload to S3
    const fileUrl = await uploadToS3(buffer, fileName, file.type);

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
