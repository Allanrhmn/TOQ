import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedCustomer } from "@/lib/customer-auth";
import { getAuthenticatedAdmin } from "@/lib/admin-auth";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedCustomer(request);
    const admin = await getAuthenticatedAdmin(request);

    if (!user && !admin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const systemPrompt = "You are a helpful shopping assistant for CREATSABR, a premium Danish streetwear and accessories e-commerce platform. Help customers find products, answer questions about our items, provide style recommendations, and deliver excellent customer service. When appropriate, suggest relevant products based on customer interests and preferences. Be friendly, professional, and knowledgeable about fashion.";

    const messages = [
      ...(history || []).map((msg: any) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      {
        role: "user" as const,
        content: message,
      },
    ];

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: [
        {
          type: "text",
          text: systemPrompt,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: messages,
    });

    const assistantMessage =
      response.content[0].type === "text"
        ? response.content[0].text
        : "I'm sorry, I couldn't process that request.";

    return NextResponse.json({
      response: assistantMessage,
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
