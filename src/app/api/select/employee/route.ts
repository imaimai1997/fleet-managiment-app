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
<<<<<<< HEAD
    return NextResponse.json(
      { message: "Success", employees },
      { status: 200 },
    );
=======
    return NextResponse.json({ message: "Success", employees }, { status: 200 });
>>>>>>> 3cc0e96a95b5a4c36667d44b2ec093a3f7882958
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
