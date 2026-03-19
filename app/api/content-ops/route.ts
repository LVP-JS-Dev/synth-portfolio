import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { authenticateContentOps } from "@/lib/content-ops/auth";
import {
  CONTENT_OPS_CONTEXT,
  ContentOpsError,
  deleteContentFile,
  listContentPaths,
  readContentFile,
  upsertContentFile,
} from "@/lib/content-ops";

const JSON_HEADERS = { "Content-Type": "application/json" };

function formatResponse(payload: Record<string, unknown>, status = 200) {
  return new NextResponse(JSON.stringify(payload), {
    status,
    headers: JSON_HEADERS,
  });
}

function authResponse(error: { status: number; message: string }) {
  return formatResponse({ success: false, error: error.message }, error.status);
}

function hashContent(content: string) {
  return createHash("sha256").update(content).digest("hex");
}

function errorResponse(error: unknown) {
  if (error instanceof ContentOpsError) {
    return formatResponse(
      {
        success: false,
        error: error.message,
        code: error.code,
      },
      error.status,
    );
  }

  return formatResponse(
    {
      success: false,
      error: "Unexpected content operation failure",
      code: "UNEXPECTED_ERROR",
    },
    500,
  );
}

async function tryReadPrevious(path: string) {
  try {
    const content = await readContentFile(path);
    return {
      exists: true,
      hash: hashContent(content),
      byteLength: Buffer.byteLength(content, "utf8"),
    };
  } catch {
    return {
      exists: false,
      hash: null,
      byteLength: null,
    };
  }
}

async function safeJsonBody(request: NextRequest) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const authError = authenticateContentOps(request);
  if (authError) {
    return authResponse(authError);
  }

  const url = new URL(request.url);
  const op = url.searchParams.get("op");

  if (op === "list") {
    try {
      const paths = await listContentPaths();
      return formatResponse({ success: true, data: paths });
    } catch (error) {
      return errorResponse(error);
    }
  }

  if (op === "read") {
    const pathParam = url.searchParams.get("path");
    if (!pathParam) {
      return formatResponse({ success: false, error: "Missing path" }, 400);
    }

    try {
      const content = await readContentFile(pathParam);
      return formatResponse({ success: true, data: content });
    } catch (error) {
      return errorResponse(error);
    }
  }

  if (op === "context") {
    return formatResponse({ success: true, data: CONTENT_OPS_CONTEXT });
  }

  return formatResponse({ success: false, error: "Unknown operation" }, 400);
}

export async function POST(request: NextRequest) {
  const authError = authenticateContentOps(request);
  if (authError) {
    return authResponse(authError);
  }

  const body = await safeJsonBody(request);
  if (!body || typeof body !== "object") {
    return formatResponse({ success: false, error: "Invalid JSON payload" }, 400);
  }

  if (!("op" in body) || body.op !== "upsert") {
    return formatResponse({ success: false, error: "Invalid operation" }, 400);
  }

  if (!("path" in body) || typeof body.path !== "string" || typeof body.content !== "string") {
    return formatResponse({ success: false, error: "Invalid payload" }, 400);
  }

  try {
    const previous = await tryReadPrevious(body.path);
    await upsertContentFile(body.path, body.content);
    const nextHash = hashContent(body.content);
    return formatResponse({
      success: true,
      audit: {
        op: "upsert",
        path: body.path,
        previous,
        next: {
          hash: nextHash,
          byteLength: Buffer.byteLength(body.content, "utf8"),
        },
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: NextRequest) {
  const authError = authenticateContentOps(request);
  if (authError) {
    return authResponse(authError);
  }

  const body = await safeJsonBody(request);
  if (!body || typeof body !== "object") {
    return formatResponse({ success: false, error: "Invalid JSON payload" }, 400);
  }

  if (!("op" in body) || body.op !== "delete") {
    return formatResponse({ success: false, error: "Invalid operation" }, 400);
  }

  if (!("path" in body) || typeof body.path !== "string") {
    return formatResponse({ success: false, error: "Missing path" }, 400);
  }

  try {
    const previous = await tryReadPrevious(body.path);
    await deleteContentFile(body.path);
    return formatResponse({
      success: true,
      audit: {
        op: "delete",
        path: body.path,
        previous,
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
