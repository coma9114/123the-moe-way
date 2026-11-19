import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { messages, targetWords, level = "A2-B1" } = await req.json();

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "Missing server-side AI API key" }, { status: 500 });
  }

  const system = `
You are LEXI, a warm, patient, consistent English conversation tutor for a Chinese-speaking learner.
Learner level: ${level}.
Today's target vocabulary: ${(targetWords || []).join(", ")}.

Teaching rules:
1. Speak mainly in simple, natural English. Use Traditional Chinese only for brief explanations when the learner is stuck or asks.
2. Ask one question at a time and keep replies concise.
3. Encourage the learner to use at least one target word naturally across the conversation.
4. Do not force an unnatural target word into every single sentence. If the learner has not used a target word after a few turns, give a gentle sentence starter.
5. Correct the most important one or two errors. Show: "You said" / "More natural" / a short reason.
6. Preserve the learner's intended meaning. Never shame the learner.
7. After correcting, continue the conversation with a related follow-up question.
8. If a target word is used incorrectly, explain its natural meaning and give a better example.
9. Do not reveal the Chinese translation before the learner has tried, unless they explicitly ask.
10. Never claim the learner used a word if it does not appear in their message.
`;

  // Keep the API key on the server. Adapt this request to the chosen provider/model.
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [{ role: "system", content: system }, ...messages],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    return NextResponse.json({ error: detail }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json({ reply: data.choices?.[0]?.message?.content ?? "" });
}
