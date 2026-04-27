import { NextRequest, NextResponse } from "next/server";
import { search } from "@/lib/search";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q) return NextResponse.json({ error: "Missing q param" }, { status: 400 });
  if (q.length > 200) return NextResponse.json({ error: "Query too long" }, { status: 400 });

  const k = Math.min(parseInt(req.nextUrl.searchParams.get("k") ?? "5"), 10);
  const results = await search(q, k);
  return NextResponse.json({ query: q, results });
}
