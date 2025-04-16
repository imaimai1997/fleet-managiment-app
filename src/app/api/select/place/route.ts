import { prisma, prismaExecute } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

//使用場所取得
export const GET = async () => {
  try {
    return await prismaExecute(async () => {
      const places = await prisma.place.findMany({});
      return NextResponse.json({ message: "Success", places }, { status: 200 });
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
      const place = await prisma.place.create({
        data: {
          name,
        },
      });
      return NextResponse.json({ message: "Success", place }, { status: 201 });
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
