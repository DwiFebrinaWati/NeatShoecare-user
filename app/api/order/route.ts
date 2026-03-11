import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const res = await fetch("https://api.neatshoecare.my.id/order/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    // log response API biar tahu datanya apa
    console.log("🟩 API RESPONSE:", data)

    return NextResponse.json(data, { status: res.status })
  } catch (err) {
    console.error("Order API error:", err)
    return NextResponse.json(
      { message: "Error calling external API", error: String(err) },
      { status: 500 }
    )
  }
}
