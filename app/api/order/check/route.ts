import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const groupId = searchParams.get("groupId")
    const uniqueCode = searchParams.get("uniqueCode")

    if (!groupId || !uniqueCode) {
      return NextResponse.json(
        { status: "error", message: "groupId & uniqueCode required" },
        { status: 400 }
      )
    }

    const url = `https://api.neatshoecare.my.id/order/my-order/${groupId}/unique-code/${uniqueCode}`

    const res = await fetch(url)
    const data = await res.json()

    return NextResponse.json(data, { status: res.status })
  } catch (e) {
    return NextResponse.json(
      { status: "error", message: "Error checking order" },
      { status: 500 }
    )
  }
}
