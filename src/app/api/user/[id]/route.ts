import { PrismaClient } from "@prisma/client";
import { main } from "../route";
import { NextResponse } from "next/server";
import { adminAuth } from "@/utils/adminFirebase";

const prisma = new PrismaClient();

export const GET = async (req: Request) => {
  const id = req.url.split("/user/")[1];
  try {
    await main();
    const user = await prisma.user.findFirst({
      where: { id: id },
      include: {
        role: true,
      },
    });
    return NextResponse.json(
      { message: "Success", user },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return (
      NextResponse.json({ message: "Error", err }),
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
};

//ユーザー情報削除

export const DELETE = async (req: Request) => {
  const id = req.url.split("/user/")[1];
  try {
    await main();
    const user = await prisma.user.delete({
      where: { id: id },
    });
    await adminAuth.deleteUser(id.toString());
    return NextResponse.json(
      { message: "Success", user },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return (
      NextResponse.json({ message: "Error", err }),
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
};