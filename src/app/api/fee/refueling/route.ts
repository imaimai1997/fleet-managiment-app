import { prisma, prismaExecute } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

type CsvRow = {
  利用日変換: string;
  カード番号: number;
  合計: number;
  数量変換: number;
};

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    return await prismaExecute(async () => {
      const refuelingFees = await prisma.refuelingFee.createMany({
        data: body.map((item: CsvRow) => ({
          refueling_card_number: String(item["カード番号"]),
          fee_date: new Date(`${item["利用日変換"]}-01`),
          refueling_fee: item["合計"],
          refueling_amount: item["数量変換"],
        })),
      });
      return NextResponse.json(
        { message: "Success", refuelingFees },
        { status: 201 },
      );
    });
  } catch (err) {
    console.log(body);
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
