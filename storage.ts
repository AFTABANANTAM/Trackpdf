import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
// Provider-agnostic interface: swap the implementation to change storage vendors.
export interface Storage {
  put(key: string, body: Buffer, contentType: string): Promise<void>;
  get(key: string): Promise<ReadableStream>;
}
const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID!, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY! },
});
const Bucket = process.env.R2_BUCKET!;
export const storage: Storage = {
  async put(Key, Body, ContentType) { await s3.send(new PutObjectCommand({ Bucket, Key, Body, ContentType })); },
  async get(Key) {
    const r = await s3.send(new GetObjectCommand({ Bucket, Key }));
    return r.Body!.transformToWebStream();
  },
};
