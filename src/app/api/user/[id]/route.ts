import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { deleteUser, updateUser } from "@/utils/adminFirebase";

const prisma = new PrismaClient();
async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    console.error("DB接続エラー:", err);
    return new Error("DB接続に失敗しました");
  }
}

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
    return NextResponse.json({ message: "Success", user },{status: 200});
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
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
    await deleteUser(id);
    return NextResponse.json({ message: "Success", user },{status: 200});
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

//ユーザー情報編集
export const PUT = async (req: Request) => {
  const id = req.url.split("/user/")[1];
  const { roleName, name, email } = await req.json();

  try {
    await main();
    const user = await prisma.user.update({
      data: {
        roleName,
        name,
        email,
      },
      where: { id: id },
    });
    await updateUser(id, email);
    return NextResponse.json({ message: "Success", user },{status: 200});
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
