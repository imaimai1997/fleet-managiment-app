import { PrismaClient } from "@prisma/client";
import { main } from "@/utils/prisma/prismaMain";

const prisma = new PrismaClient();

//管理者取得
export const GET = async () => {
  try {
    await main();
    const employees = await prisma.employee.findMany({});
    return Response.json({ message: "Success", employees }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
