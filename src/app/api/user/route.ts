import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    console.error("DB接続エラー:", err);
    return new Error("DB接続に失敗しました");
  }
}
//ユーザー一覧取得
export const GET = async () => {
  try {
    await main();
    const users = await prisma.user.findMany({
      include: {
        role: true,
      },
    });
    return NextResponse.json({ message: "Success", users }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request) => {
  const { id, roleName, name, password, email } = await req.json();

  try {
    await main();
    const user = await prisma.user.create({
      data: {
        id,
        roleName,
        name,
        password,
        email,
      },
    });
    return NextResponse.json({ message: "Success", user }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
