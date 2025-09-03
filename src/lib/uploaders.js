import { uploadToS3 } from "./s3";

// Product Image
export const productImageUploader = (buffer, fileName, fileType) =>
  uploadToS3(buffer, fileName, fileType, "products");

// Category Image
export const categoryImageUploader = (buffer, fileName, fileType) =>
  uploadToS3(buffer, fileName, fileType, "categories");

// Banner Image
export const bannerImageUploader = (buffer, fileName, fileType) =>
  uploadToS3(buffer, fileName, fileType, "banners");

// Market Logo
export const marketLogoUploader = (buffer, fileName, fileType) =>
  uploadToS3(buffer, fileName, fileType, "markets");

// Add more wrappers here as needed (e.g., user avatars)
