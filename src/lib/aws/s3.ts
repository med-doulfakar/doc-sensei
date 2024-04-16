import AWS from "aws-sdk";

export async function uploadToS3(file: File) {
  try {
    AWS.config.credentials = {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    };

    const s3 = new AWS.S3({
      params: {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        region: "us-east-1",
      },
    });

    const file_key =
      "uploads/" + Date.now().toString() + file.name.replace(" ", "-");

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: file_key,
      Body: file,
    };

    const upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(
          "uploading to S3 .... ",
          parseInt(((evt.loaded * 100) / evt.total).toString())
        );
      })
      .promise();

    await upload.then((data) => {
      console.log("Successfully uploaded to S3");
    });

    return Promise.resolve({
      file_key,
      file_name: file.name,
    });
  } catch {}
}

export function getS3Url(file_key: string) {
    const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.us-east-1.amazonaws.com/${file_key}`;
    return url;
}