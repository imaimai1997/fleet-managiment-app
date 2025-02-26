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

export const GET = async () => {
  try {
    await main();
    const user = await prisma.user.findMany({
      where: { notice: true },
      select: {
        email: true,
      },
    });
    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
