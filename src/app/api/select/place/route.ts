import { PrismaClient } from "@prisma/client";
import { main } from "@/utils/prisma/prismaMain";

const prisma = new PrismaClient();

//使用場所取得
export const GET = async () => {
  try {
    await main();
    const places = await prisma.place.findMany({});
    return Response.json({ message: "Success", places }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
