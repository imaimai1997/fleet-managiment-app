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

export const GET = async (req: Request) => {
  const id = parseInt(req.url.split("/select/employee/")[1]);
  try {
    await main();
    const employee = await prisma.employee.findFirst({
      where: { id: id },
    });
    return NextResponse.json({ message: "Success", employee }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: Request) => {
  const id = parseInt(req.url.split("/select/employee/")[1]);
  try {
    await main();
    const employee = await prisma.employee.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: "Success", employee }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request) => {
  const { id, name, email } = await req.json();
  try {
    await main();
    const employee = await prisma.employee.update({
      where: { id: id },
      data: { name, email },
    });
    return NextResponse.json({ message: "Success", employee }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
