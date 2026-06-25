import { NextRequest, NextResponse } from "next/server";
import { callAiChat } from "@/server/ai/client";
import { ASO_AUDIT_SYSTEM_PROMPT } from "@/server/ai/aso-audit-prompt";
import { MOCK_AI_AUDIT } from "@/lib/mock-data";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const appId = body?.appId as string | undefined;

  if (!appId) {
    return NextResponse.json({ error: "appId is required." }, { status: 400 });
  }

  if (!process.env.AI_API_KEY) {
    const mock = MOCK_AI_AUDIT[appId] ?? Object.values(MOCK_AI_AUDIT)[0];
    return NextResponse.json({ result: mock, source: "mock" });
  }

  try {
    const content = await callAiChat([
      { role: "system", content: ASO_AUDIT_SYSTEM_PROMPT },
      { role: "user", content: JSON.stringify(body) },
    ]);
    const result = JSON.parse(content);
    return NextResponse.json({ result, source: "ai" });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "AI audit failed." },
      { status: 502 }
    );
  }
}
