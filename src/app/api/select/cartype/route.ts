import { prisma, prismaExecute } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

//車種一覧取得
export const GET = async () => {
  try {
    return await prismaExecute(async () => {
      const cartype = await prisma.carType.findMany({});
      return NextResponse.json(
        { message: "Success", cartype },
        { status: 200 },
      );
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
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
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
