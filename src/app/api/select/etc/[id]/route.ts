import { prisma, prismaExecute } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const id = parseInt(req.url.split("/select/etc/")[1]);
  try {
    return await prismaExecute(async () => {
      const etcCard = await prisma.etc_card.findFirst({
        where: { id: id },
      });
      return NextResponse.json(
        { message: "Success", etcCard },
        { status: 200 },
      );
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const id = parseInt(req.url.split("/select/etc/")[1]);
  try {
    return await prismaExecute(async () => {
      const etcCard = await prisma.etc_card.delete({
        where: { id: id },
      });
      return NextResponse.json(
        { message: "Success", etcCard },
        { status: 200 },
      );
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  const { id, name, number, period } = await req.json();
  try {
    return await prismaExecute(async () => {
      const etcCard = await prisma.etc_card.update({
        where: { id: id },
        data: { name, number, period },
      });
      return NextResponse.json(
        { message: "Success", etcCard },
        { status: 200 },
      );
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
