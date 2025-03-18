import * as env from "env-var"

export const DATABASE_URL = env.get("DATABASE_URL").required().asString()

export const ADMINJS_COOKIE_PASSWORD = env.get("ADMINJS_COOKIE_PASSWORD").required().asString()

export const JWT_KEY = env.get("JWT_KEY").required().asString()

export const AWS_ACCESS_KEY_ID = env.get("AWS_ACCESS_KEY_ID").required().asString()

export const AWS_SECRET_ACCESS_KEY = env.get("AWS_SECRET_ACCESS_KEY").required().asString()

export const AWS_REGION = env.get("AWS_REGION").required().asString()

export const BUCKET_NAME = env.get("BUCKET_NAME").required().asString()