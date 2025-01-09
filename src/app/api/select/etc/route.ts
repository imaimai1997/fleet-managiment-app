import { PrismaClient } from "@prisma/client";
import { main } from "@/utils/prisma/prismaMain";

const prisma = new PrismaClient();
//ETCカード取得
export const GET = async () => {
  try {
    await main();
    const etc_cards = await prisma.etc_card.findMany({});
    return Response.json({ message: "Success", etc_cards }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
