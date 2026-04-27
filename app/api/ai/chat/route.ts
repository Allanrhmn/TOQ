import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1024,
        system:
          "You are a helpful shopping assistant for CREAT, a premium streetwear and accessories brand. Help customers find products, answer questions about our items, and provide excellent customer service.",
        messages: [
          ...history.map((msg: any) => ({
            role: msg.role,
            content: msg.content,
          })),
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();
    const assistantMessage =
      data.content[0].type === "text"
        ? data.content[0].text
        : "I'm sorry, I couldn't process that request.";

    return NextResponse.json({
      response: assistantMessage,
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
