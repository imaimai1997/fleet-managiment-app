import { prisma, prismaExecute } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    return await prismaExecute(async () => {
      const user = await prisma.user.findMany({
        where: { notice: true },
        select: {
          email: true,
        },
      });
      return NextResponse.json({ message: "Success", user }, { status: 200 });
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
