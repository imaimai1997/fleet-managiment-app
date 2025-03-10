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
  const id = parseInt(req.url.split("/select/company/")[1]);
  try {
    await main();
    const leasingCompany = await prisma.leasingCompany.findFirst({
      where: { id: id },
    });
    return NextResponse.json(
      { message: "Success", leasingCompany },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: Request) => {
  const id = parseInt(req.url.split("/select/company/")[1]);
  try {
    await main();
    const leasingCompany = await prisma.leasingCompany.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: "Success", leasingCompany },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request) => {
  const { id, name } = await req.json();
  try {
    await main();
    const leasingCompany = await prisma.leasingCompany.update({
      where: { id: id },
      data: { name },
    });
    return NextResponse.json(
      { message: "Success", leasingCompany },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
