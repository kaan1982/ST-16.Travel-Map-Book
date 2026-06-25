/** Thin wrapper around any OpenAI-compatible chat completions endpoint. */

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function callAiChat(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.AI_API_KEY;
  const baseUrl = process.env.AI_BASE_URL ?? "https://api.openai.com/v1";
  const model = process.env.AI_MODEL ?? "gpt-4o-mini";

  if (!apiKey) {
    throw new Error("AI_API_KEY is not configured.");
  }

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, messages, temperature: 0.4 }),
  });

  if (!res.ok) {
    throw new Error(`AI provider request failed with status ${res.status}`);
  }

  const json = await res.json();
  return json?.choices?.[0]?.message?.content ?? "";
}
