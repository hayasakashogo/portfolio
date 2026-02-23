import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/contactSchema";
import { getClient } from "@/lib/microcms";

async function notifySlack(data: { name: string; email: string; message: string }) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: "ポートフォリオサイトに新しい問い合わせが届きました",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: [
              "*新しい問い合わせ*",
              `*名前:* ${data.name}`,
              `*メール:* ${data.email}`,
              `*メッセージ:*\n${data.message}`,
            ].join("\n"),
          },
        },
      ],
    }),
  });
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "リクエストの形式が不正です" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "入力内容を確認してください", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  try {
    await getClient().create({
      endpoint: "contacts",
      content: parsed.data,
    });

    // Slack 通知（失敗してもフォーム送信は成功扱い）
    notifySlack(parsed.data).catch((err) =>
      console.error("[contact/route] Slack notify error:", err)
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact/route] microCMS error:", err);
    return NextResponse.json(
      { error: "送信に失敗しました。時間をおいて再度お試しください。" },
      { status: 500 }
    );
  }
}
