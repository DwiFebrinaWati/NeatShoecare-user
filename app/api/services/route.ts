// /app/api/services/route.ts
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://api.neatshoecare.my.id/Service")
    if (!response.ok) {
      return NextResponse.json(
        { message: "Gagal fetch API eksternal" },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(
      { message: "Terjadi error saat fetch API", error: err },
      { status: 500 }
    )
  }
}
