import { PrismaClient } from "@prisma/client";

// グローバルのPrismaClientインスタンスを作成
export const prisma = new PrismaClient();

// DB接続関数
export async function connectDB() {
  try {
    await prisma.$connect();
  } catch (err) {
    console.error("DB接続エラー:", err);
    throw new Error("DB接続に失敗しました");
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
