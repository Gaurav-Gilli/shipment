import db from "@/lib/database";
import { NextResponse } from "next/server";

// GET: Fetch a shipment by ID
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const shipment = db.prepare("SELECT * FROM shipments WHERE id = ?").get(id);

    if (!shipment) {
      return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
    }

    return NextResponse.json({ shipment });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch shipment" }, { status: 500 });
  }
}
    