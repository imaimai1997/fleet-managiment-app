import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function connectDB() {
  try {
    await prisma.$connect();
  } catch (err) {
    console.error("DB接続エラー:", err);
    return new Error("DB接続に失敗しました");
  }
}

// 処理とDB切断を行うためのヘルパー関数
export async function prismaExecute<T>(callback: () => Promise<T>): Promise<T> {
  try {
    await connectDB();
    return await callback();
  } finally {
    await prisma.$disconnect();
  }
}
