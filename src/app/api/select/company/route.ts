import { PrismaClient } from "@prisma/client";
import { main } from "@/utils/prisma/prismaMain";

const prisma = new PrismaClient();

//リース会社取得
export const GET = async () => {
  try {
    await main();
    const leasingCompanyes = await prisma.leasingCompany.findMany({});
    return Response.json(
      { message: "Success", leasingCompanyes },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
