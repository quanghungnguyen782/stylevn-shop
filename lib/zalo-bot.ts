/**
 * Thin client for the Zalo Bot Platform HTTP API (bot-api.zaloplatforms.com).
 * Mirrors Telegram's Bot API shape — confirmed live against the real token:
 * getMe/setWebhook/sendMessage all take the same {chat_id, text, ...} params
 * and return {ok, result, error_code}.
 */

const BASE_URL = "https://bot-api.zaloplatforms.com";

function getToken(): string {
  const token = process.env.ZALO_BOT_TOKEN;
  if (!token) throw new Error("Missing ZALO_BOT_TOKEN env var");
  return token;
}

interface ZaloApiResponse<T> {
  ok: boolean;
  result?: T;
  error_code: number;
  description?: string;
}

async function callMethod<T>(method: string, body: Record<string, unknown>): Promise<ZaloApiResponse<T>> {
  const res = await fetch(`${BASE_URL}/bot${getToken()}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function sendZaloMessage(chatId: string, text: string): Promise<void> {
  const result = await callMethod("sendMessage", { chat_id: chatId, text });
  if (!result.ok) {
    console.error("sendZaloMessage failed", { chatId, description: result.description });
  }
}
