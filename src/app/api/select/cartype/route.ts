import { PrismaClient } from "@prisma/client";
import { main } from "@/utils/prisma/prismaMain";

const prisma = new PrismaClient();

//車種一覧取得
export const GET = async () => {
  try {
    await main();
    const cartype = await prisma.carType.findMany({});
    return Response.json({ message: "Success", cartype }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
