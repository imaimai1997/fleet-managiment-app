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

//管理者取得
export const GET = async () => {
  try {
    await main();
    const employees = await prisma.employee.findMany({});
    return NextResponse.json(
      { message: "Success", employees },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request) => {
  const { name, email } = await req.json();

  try {
    await main();
    const employee = await prisma.employee.create({
      data: {
        name,
        email,
      },
    });
    return NextResponse.json({ message: "Success", employee }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
