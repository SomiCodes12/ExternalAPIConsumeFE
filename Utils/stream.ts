import cloudinary from "./cloudinary";
import streamifier from "streamifier";

export const myUpload = async (req: any) => {
  return new Promise(async (Resolve, Reject) => {
    let stream = cloudinary.uploader.upload_stream(
      (error: Error, result: any) => {
        if (result) {
          return Resolve(result);
        } else {
          return Reject(error);
        }
      }
    );

    streamifier.createReadStream(req?.file.buffer).pipe(stream);
  });
};
