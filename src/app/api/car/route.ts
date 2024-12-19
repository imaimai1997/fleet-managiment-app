import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error ("DB接続に失敗しました");
  }
}

export const GET = async ( req : Request, res: NextResponse) => {
  try {
    await main();
    const cars = await prisma.car.findMany();
    return NextResponse.json({ message:"Success", cars},{status:200})
  }catch(err) {
    return NextResponse.json({ message: "Error", err}, {status:500});
  }finally{
    await prisma.$disconnect();
  }

};