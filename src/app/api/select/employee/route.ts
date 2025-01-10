import { PrismaClient } from "@prisma/client";
import { main } from "@/utils/prisma/prismaMain";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

//管理者取得
export const GET = async () => {
  try {
    await main();
    const employees = await prisma.employee.findMany({});
    return NextResponse.json({ message: "Success", employees }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
