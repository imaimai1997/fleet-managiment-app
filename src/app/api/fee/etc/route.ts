import { prisma, prismaExecute } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

type CsvRow = {
  usageDate: string;
  cardNumber: number;
  etcFee: number;
};

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    return await prismaExecute(async () => {
      const etcFees = await prisma.etcFee.createMany({
        data: body.map((item: CsvRow) => ({
          etc_card_number: String(item.cardNumber),
          fee_date: new Date(`${item.usageDate}-01`),
          etc_fee: item.etcFee,
        })),
      });
      return NextResponse.json(
        { message: "Success", etcFees },
        { status: 201 },
      );
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
