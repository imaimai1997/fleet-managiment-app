import { prisma, prismaExecute } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";
import { deleteUser, updateUser } from "@/utils/adminFirebase";

export const GET = async (req: Request) => {
  const id = req.url.split("/user/")[1];
  try {
    return await prismaExecute(async () => {
      const user = await prisma.user.findFirst({
        where: { id: id },
        include: {
          role: true,
        },
      });
      return NextResponse.json({ message: "Success", user }, { status: 200 });
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

//ユーザー情報削除

export const DELETE = async (req: Request) => {
  const id = req.url.split("/user/")[1];
  try {
    return await prismaExecute(async () => {
      const user = await prisma.user.delete({
        where: { id: id },
      });
      await deleteUser(id);
      return NextResponse.json({ message: "Success", user }, { status: 200 });
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

//ユーザー情報編集
export const PUT = async (req: Request) => {
  const id = req.url.split("/user/")[1];
  const { roleName, name, email, notice } = await req.json();

  try {
    return await prismaExecute(async () => {
      const user = await prisma.user.update({
        data: {
          roleName,
          name,
          email,
          notice,
        },
        where: { id: id },
      });
      await updateUser(id, email);
      return NextResponse.json({ message: "Success", user }, { status: 200 });
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
