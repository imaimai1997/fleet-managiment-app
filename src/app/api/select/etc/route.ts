import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";


const prisma = new PrismaClient();
async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    console.error("DB接続エラー:", err);
    return new Error("DB接続に失敗しました");
  }
}
//ETCカード取得
export const GET = async () => {
  try {
    await main();
    const etc_cards = await prisma.etc_card.findMany({});
    return NextResponse.json({ message: "Success", etc_cards }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
