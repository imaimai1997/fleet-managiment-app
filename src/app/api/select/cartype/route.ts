import { prisma, prismaExecute } from "@/lib/prisma";
import { NextResponse } from "next/server";

//車種一覧取得
export const GET = async () => {
  try {
    return await prismaExecute(async () => {
      const carTypes = await prisma.carType.findMany({});
      return NextResponse.json(
        { message: "Success", carTypes },
        { status: 200 },
      );
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 },
    );
  }
};

export const POST = async (req: Request) => {
  const { name } = await req.json();

  try {
    return await prismaExecute(async () => {
      const cartype = await prisma.carType.create({
        data: {
          name,
        },
      });
      return NextResponse.json(
        { message: "Success", cartype },
        { status: 201 },
      );
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 },
    );
  }
};
