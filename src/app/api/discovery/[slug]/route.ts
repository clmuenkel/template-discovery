import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/discovery/:slug
 * Returns { snapshot: {...}, mapper: {...} }
 */
export async function GET(_req: NextRequest, ctx: RouteContext) {
  try {
    const { slug } = await ctx.params;
    const sql = getDb();

    const rows = await sql.query(
      `SELECT data_type, payload FROM discovery_data WHERE slug = $1`,
      [slug]
    );

    const result: Record<string, unknown> = { snapshot: {}, mapper: {} };
    for (const row of rows) {
      result[row.data_type as string] = row.payload;
    }

    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof Error && err.message.includes("DATABASE_URL")) {
      return NextResponse.json(
        { error: "Database not configured", fallback: true },
        { status: 503 }
      );
    }
    console.error("GET /api/discovery error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

/**
 * PUT /api/discovery/:slug
 * Body: { type: "snapshot" | "mapper", payload: {...} }
 * Upserts the data for this slug + type.
 */
export async function PUT(req: NextRequest, ctx: RouteContext) {
  try {
    const { slug } = await ctx.params;
    const body = await req.json();
    const { type, payload } = body;

    if (!type || !["snapshot", "mapper"].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be "snapshot" or "mapper".' },
        { status: 400 }
      );
    }

    const sql = getDb();

    await sql.query(
      `INSERT INTO discovery_data (slug, data_type, payload, updated_at)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (slug, data_type)
       DO UPDATE SET payload = $3, updated_at = NOW()`,
      [slug, type, JSON.stringify(payload)]
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof Error && err.message.includes("DATABASE_URL")) {
      return NextResponse.json(
        { error: "Database not configured", fallback: true },
        { status: 503 }
      );
    }
    console.error("PUT /api/discovery error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

/**
 * DELETE /api/discovery/:slug
 * Removes all discovery data for this slug.
 */
export async function DELETE(_req: NextRequest, ctx: RouteContext) {
  try {
    const { slug } = await ctx.params;
    const sql = getDb();

    await sql.query(`DELETE FROM discovery_data WHERE slug = $1`, [slug]);

    return NextResponse.json({ ok: true, deleted: slug });
  } catch (err) {
    if (err instanceof Error && err.message.includes("DATABASE_URL")) {
      return NextResponse.json(
        { error: "Database not configured", fallback: true },
        { status: 503 }
      );
    }
    console.error("DELETE /api/discovery error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
