import * as dotenv from 'dotenv';

dotenv.config();

export const APPLICATION_PORT = +process.env.APPLICATION_PORT;
export const CRYPTO_ROUND = +process.env.CRYPTO_ROUND;
export const JWT_SECRET = process.env.JWT_SECRET;
export const AWS_REGION = process.env.AWS_REGION;
export const AWS_KEY_ID = process.env.AWS_KEY_ID;
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
export const AUTH0_ISSUER_URL = process.env.AUTH0_ISSUER_URL;
export const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;
