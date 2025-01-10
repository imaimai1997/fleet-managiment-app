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

//使用場所取得
export const GET = async () => {
  try {
    await main();
    const places = await prisma.place.findMany({});
    return NextResponse.json({ message: "Success", places }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
