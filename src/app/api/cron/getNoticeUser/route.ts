import { prisma, prismaExecute } from "@/lib/prisma";
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
    console.error(err);
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 },
    );
  }
};
