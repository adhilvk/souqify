import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadToS3(fileBuffer, fileName, fileType) {
const region = process.env.NEXT_PUBLIC_AWS_REGION;
const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;

  console.log("ENV CHECK:", { region, accessKeyId, bucketName });

  if (!region || !accessKeyId || !secretAccessKey || !bucketName) {
    throw new Error("Missing AWS environment variables");
  }

  const s3 = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: fileType,
    // ACL: "public-read",
  });

  await s3.send(command);

  return `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
}
