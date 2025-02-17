import db from "@/lib/database";
import { NextResponse } from "next/server";

// GET: Fetch all shipments
export async function GET() {
  try {
    const shipments = db.prepare("SELECT * FROM shipments").all();
    return NextResponse.json({ shipments });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch shipments" }, { status: 500 });
  }
}

// POST: Add a new shipment
export async function POST(req) {
  try {
    const { origin, destination } = await req.json();
    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString(); // Current timestamp

    const stmt = db.prepare(`
      INSERT INTO shipments (id, origin, destination, status, createdAt, lastUpdated)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run(id, origin, destination, "In Transit", timestamp, timestamp);

    return NextResponse.json({ message: "Shipment added successfully", id });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add shipment" }, { status: 500 });
  }
}
