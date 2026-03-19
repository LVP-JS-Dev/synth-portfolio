import { NextRequest } from "next/server";

const TOKEN = process.env.CONTENT_OPS_TOKEN;
const IS_DEV = process.env.NODE_ENV === "development";
const ALLOW_INSECURE_DEV = process.env.CONTENT_OPS_ALLOW_INSECURE_DEV === "true";

export function authenticateContentOps(request: NextRequest) {
  if (IS_DEV && ALLOW_INSECURE_DEV) {
    return null;
  }

  if (!TOKEN) {
    return { status: 500, message: "CONTENT_OPS_TOKEN is not configured" };
  }

  const authHeader = request.headers.get("authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) {
    return { status: 401, message: "Missing or invalid authorization header" };
  }

  const provided = authHeader.slice(7).trim();
  if (provided !== TOKEN) {
    return { status: 403, message: "Invalid authorization token" };
  }

  return null;
}
