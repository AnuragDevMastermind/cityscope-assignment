import bodyParser from "body-parser";
import compression from "compression";
import { connectDB } from "./db/db";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { S3Client } from "@aws-sdk/client-s3";
import router from "./router/createRouter";


dotenv.config()

export const accessKey = process.env.ACCESS_KEY;
export const bucketName = process.env.BUCKET_NAME;
export const bucketRegion = process.env.BUCKET_REGION;
export const secretAccessKey = process.env.SECRET_ACCESS_KEY;

if (!accessKey || !bucketName || !bucketRegion || !secretAccessKey) {
  throw new Error("Missing required S3 client configuration values.");
}

const app = express();
const PORT = 8081;

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:3000",
  })
);

app.options(
  "*",
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

export const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey
  },
  region: bucketRegion
})

const startServer = () => {
  app.use("/", router());

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};

connectDB()
  .then(startServer)
  .catch((error) => {
    console.error("MONGO db connection failed !!! ", error.message);
  });
