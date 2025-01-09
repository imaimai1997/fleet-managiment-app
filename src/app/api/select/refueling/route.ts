import { PrismaClient } from "@prisma/client";
import { main } from "@/utils/prisma/prismaMain";

const prisma = new PrismaClient();

//給油カード取得
export const GET = async () => {
  try {
    await main();
    const refueling_cards = await prisma.refueling_card.findMany({});
    return Response.json(
      { message: "Success", refueling_cards },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
