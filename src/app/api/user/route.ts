import { createUser } from "@/utils/adminFirebase";
import { prisma, prismaExecute } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

//ユーザー一覧取得
export const GET = async () => {
  try {
    return await prismaExecute(async () => {
      const users = await prisma.user.findMany({
        omit: { password: true },
        include: {
          role: true,
        },
      });
      return NextResponse.json({ message: "Success", users }, { status: 200 });
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "エラーが発生しました" }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const { roleName, name, password, email } = await req.json();

  try {
    const id = await createUser(email, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prismaExecute(async () => {
      const user = await prisma.user.create({
        omit: { password: true },
        data: {
          id,
          roleName,
          name,
          email,
          password: hashedPassword,
        },
      });
      return NextResponse.json({ message: "Success", user }, { status: 201 });
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "エラーが発生しました" }, { status: 500 });
  }
};
