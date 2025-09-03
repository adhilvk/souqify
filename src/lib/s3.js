import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadToS3(fileBuffer, fileName, fileType, folder = "") {
  const region = process.env.NEXT_PUBLIC_AWS_REGION;
  const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
  const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;

  if (!region || !accessKeyId || !secretAccessKey || !bucketName) {
    throw new Error("Missing AWS environment variables");
  }

  const s3 = new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });

  const Key = folder ? `${folder}/${fileName}` : fileName;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key,
    Body: fileBuffer,
    ContentType: fileType,
  });

  await s3.send(command);

  return `https://${bucketName}.s3.${region}.amazonaws.com/${Key}`;
}
