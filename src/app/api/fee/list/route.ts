import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

type ConvertibleData =
  | bigint
  | number
  | Date
  | string
  | ConvertibleData[]
  | { [key: string]: ConvertibleData };

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    console.error("DB接続エラー:", err);
    return new Error("DB接続に失敗しました");
  }
}

function convertBigIntToString(data: ConvertibleData): ConvertibleData {
  if (Array.isArray(data)) {
    return data.map((item) => convertBigIntToString(item));
  } else if (data !== null && typeof data === "object") {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        typeof value === "bigint" ? value.toString() : value,
      ]),
    );
  }
  return data;
}

async function getFeeData(carNumber: string | null, yearMonth: string | null) {
  if (carNumber === "全車") {
    const rawData = await prisma.$queryRaw<ConvertibleData[]>`
     SELECT 
      TO_CHAR(COALESCE(e.fee_date, r.fee_date), 'YYYY-MM') AS year_month,
      c.label AS car_number,
      COALESCE(SUM(e.etc_fee), 0) AS etc_total_fee,
      COALESCE(SUM(r.refueling_fee), 0) AS refueling_total_fee
    FROM "Car" c
    LEFT JOIN "Etc_card" ec ON c."etc_cardName" = ec.name
    LEFT JOIN "EtcFee" e ON ec.number = e.etc_card_number AND TO_CHAR(e.fee_date, 'YYYY-MM') = ${yearMonth}
    LEFT JOIN "Refueling_card" rc ON c."refueling_cardNumber" = rc.number
    LEFT JOIN "RefuelingFee" r ON rc.number = r.refueling_card_number AND TO_CHAR(r.fee_date, 'YYYY-MM') = ${yearMonth}
    GROUP BY year_month, car_number
    ORDER BY year_month, car_number;
  `;

    return convertBigIntToString(rawData);
  } else {
    const rawData = await prisma.$queryRaw<ConvertibleData[]>`
     SELECT 
      TO_CHAR(COALESCE(e.fee_date, r.fee_date), 'YYYY-MM') AS year_month,
      c.label AS car_number,
      COALESCE(SUM(e.etc_fee), 0) AS etc_total_fee,
      COALESCE(SUM(r.refueling_fee), 0) AS refueling_total_fee
    FROM "Car" c
    LEFT JOIN "Etc_card" ec ON c."etc_cardName" = ec.name
    LEFT JOIN "EtcFee" e ON ec.number = e.etc_card_number AND TO_CHAR(e.fee_date, 'YYYY-MM') = ${yearMonth}
    LEFT JOIN "Refueling_card" rc ON c."refueling_cardNumber" = rc.number
    LEFT JOIN "RefuelingFee" r ON rc.number = r.refueling_card_number AND TO_CHAR(r.fee_date, 'YYYY-MM') = ${yearMonth}
    WHERE c.label = ${carNumber}
    GROUP BY year_month, car_number
    ORDER BY year_month, car_number;
  `;

    return convertBigIntToString(rawData);
  }
}

export async function GET(req: Request) {
  try {
    await main();
    const { searchParams } = new URL(req.url);

    const yearMonth = searchParams.get("yearMonth");
    const carNumber = searchParams.get("carNumber")
      ? decodeURIComponent(searchParams.get("carNumber")!)
      : null;
    console.log(yearMonth, carNumber);
    if (!yearMonth) {
      return NextResponse.json(
        { success: false, message: "yearMonth パラメータが必要です" },
        { status: 400 },
      );
    }
    const res = await getFeeData(carNumber, yearMonth);
    return NextResponse.json({ success: true, res }, { status: 200 });
  } catch (err) {
    console.error("Error fetching aggregated data:", err);
    return (
      NextResponse.json({ message: "Error", err }),
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
