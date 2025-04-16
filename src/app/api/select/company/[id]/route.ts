import { prisma, prismaExecute } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const id = parseInt(req.url.split("/select/company/")[1]);
  try {
    return await prismaExecute(async () => {
      const leasingCompany = await prisma.leasingCompany.findFirst({
        where: { id: id },
      });
      return NextResponse.json(
        { message: "Success", leasingCompany },
        { status: 200 },
      );
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const id = parseInt(req.url.split("/select/company/")[1]);
  try {
    return await prismaExecute(async () => {
      const leasingCompany = await prisma.leasingCompany.delete({
        where: { id: id },
      });
      return NextResponse.json(
        { message: "Success", leasingCompany },
        { status: 200 },
      );
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  const { id, name } = await req.json();
  try {
    return await prismaExecute(async () => {
      const leasingCompany = await prisma.leasingCompany.update({
        where: { id: id },
        data: { name },
      });
      return NextResponse.json(
        { message: "Success", leasingCompany },
        { status: 200 },
      );
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
