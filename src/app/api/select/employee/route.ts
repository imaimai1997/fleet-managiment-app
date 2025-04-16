import { prisma, prismaExecute } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

//管理者取得
export const GET = async () => {
  try {
    return await prismaExecute(async () => {
      const employees = await prisma.employee.findMany({});
      return NextResponse.json(
        { message: "Success", employees },
        { status: 200 },
      );
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const { name, email } = await req.json();

  try {
    return await prismaExecute(async () => {
      const employee = await prisma.employee.create({
        data: {
          name,
          email,
        },
      });
      return NextResponse.json(
        { message: "Success", employee },
        { status: 201 },
      );
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
