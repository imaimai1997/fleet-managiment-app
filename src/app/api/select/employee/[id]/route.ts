import { prisma, prismaExecute } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const id = parseInt(req.url.split("/select/employee/")[1]);
  try {
    return await prismaExecute(async () => {
      const employee = await prisma.employee.findFirst({
        where: { id: id },
      });
      return NextResponse.json(
        { message: "Success", employee },
        { status: 200 },
      );
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const id = parseInt(req.url.split("/select/employee/")[1]);
  try {
    return await prismaExecute(async () => {
      const employee = await prisma.employee.delete({
        where: { id: id },
      });
      return NextResponse.json(
        { message: "Success", employee },
        { status: 200 },
      );
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  const { id, name, email } = await req.json();
  try {
    return await prismaExecute(async () => {
      const employee = await prisma.employee.update({
        where: { id: id },
        data: { name, email },
      });
      return NextResponse.json(
        { message: "Success", employee },
        { status: 200 },
      );
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
