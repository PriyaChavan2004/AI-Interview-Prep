import dotenv from "dotenv";
import ImageKit from "imagekit";

dotenv.config(); // standard way to load .env

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT, // make sure your .env has this key
});

export default imagekit;
