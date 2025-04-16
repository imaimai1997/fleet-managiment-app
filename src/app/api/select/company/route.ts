import { prisma, prismaExecute } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

//リース会社取得
export const GET = async () => {
  try {
    return await prismaExecute(async () => {
      const leasingCompanyes = await prisma.leasingCompany.findMany({});
      return NextResponse.json(
        { message: "Success", leasingCompanyes },
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
      const leasingCompany = await prisma.leasingCompany.create({
        data: {
          name,
        },
      });
      return NextResponse.json(
        { message: "Success", leasingCompany },
        { status: 201 },
      );
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
