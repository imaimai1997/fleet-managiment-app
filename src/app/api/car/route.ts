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

export const GET = async () => {
  try {
    await main();
    const cars = await prisma.car.findMany({
      include: {
        employee: true,
        leasing: true,
        place: true,
        etc_card: true,
        refueling_card: true,
      },
    });
    return Response.json({ message: "Success", cars }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
