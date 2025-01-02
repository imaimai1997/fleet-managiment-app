import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    console.error("DB接続エラー:", err);
    return new Error("DB接続に失敗しました");
  }
}

type CsvRow = {
  usageDate: string;
  cardNumber: number;
  etcFee: number;
};

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    await main();
    const etcFees = await prisma.etcFee.createMany({
      data: body.map((item: CsvRow) => ({
        etc_card_number: item.cardNumber,
        fee_date: new Date(`${item.usageDate}-01`),
        etc_fee: item.etcFee,
      })),
    });
    return Response.json({ message: "Success", etcFees }, { status: 201 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
