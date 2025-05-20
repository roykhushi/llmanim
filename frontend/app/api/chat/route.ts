import { NextResponse } from "next/server"
export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    const mockResponse = {
      message: `I've processed your request: "${message}"`,
      video_url: "https://example.com/sample-video.mp4", 
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json(mockResponse)
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
