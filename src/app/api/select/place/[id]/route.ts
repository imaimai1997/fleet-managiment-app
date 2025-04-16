import { prisma, prismaExecute } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const id = parseInt(req.url.split("/select/place/")[1]);
  try {
    return await prismaExecute(async () => {
      const place = await prisma.place.findFirst({
        where: { id: id },
      });
      return NextResponse.json({ message: "Success", place }, { status: 200 });
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const id = parseInt(req.url.split("/select/place/")[1]);
  try {
    return await prismaExecute(async () => {
      const place = await prisma.place.delete({
        where: { id: id },
      });
      return NextResponse.json({ message: "Success", place }, { status: 200 });
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
      const place = await prisma.place.update({
        where: { id: id },
        data: { name },
      });
      return NextResponse.json({ message: "Success", place }, { status: 200 });
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
