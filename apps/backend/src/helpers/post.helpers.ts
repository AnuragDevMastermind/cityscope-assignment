import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { bucketName, s3 } from "..";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const uploadImageAndGetUrl = async (
  name: string,
  buffer: Buffer,
  contentType: string
): Promise<string> => {
  const uploadPromise = uploadImage(name, buffer, contentType);
  const urlPromise = generateSignedUrl(name);

  await uploadPromise;
  return await urlPromise;
};

export const uploadImage = async (
  name: string,
  buffer: Buffer,
  contentType: string
) => {
  const uploadParams = {
    Bucket: bucketName,
    Key: name,
    Body: buffer,
    ContentType: contentType,
  };

  const putCommand = new PutObjectCommand(uploadParams);
  await s3.send(putCommand);
}

export const generateSignedUrl = async (name: string): Promise<string> => {
  const getObjectParams = {
    Bucket: bucketName,
    Key: name,
  };
  const getCommand = new GetObjectCommand(getObjectParams);
  return getSignedUrl(s3, getCommand, { expiresIn: 3600 });
};
