import { prisma, prismaExecute } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

type ConvertibleData =
  | bigint
  | number
  | Date
  | string
  | ConvertibleData[]
  | { [key: string]: ConvertibleData };

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

async function getGasMileageData(
  carNumber: string | null,
  yearMonth: string | null,
) {
  if (carNumber === "全車") {
    const rawData = await prisma.$queryRaw<ConvertibleData[]>`
      SELECT 
      TO_CHAR(COALESCE(m.mileage_date, r.fee_date), 'YYYY-MM') AS year_month,
      c.label AS car_number,
      COALESCE(SUM(m.mileage), 0) AS mileage_total_mileage,
      COALESCE(SUM(r.refueling_amount), 0) AS refueling_total_amount
    FROM "Car" c
    LEFT JOIN "Mileage" m ON c.label = m.car_label AND TO_CHAR(m.mileage_date, 'YYYY-MM') = ${yearMonth}
    LEFT JOIN "Refueling_card" rc ON c."refueling_cardNumber" = rc.number
    LEFT JOIN "RefuelingFee" r ON rc.number = r.refueling_card_number AND TO_CHAR(r.fee_date, 'YYYY-MM') = ${yearMonth}
    GROUP BY year_month, car_number
    ORDER BY year_month, car_number;
  `;

    return convertBigIntToString(rawData);
  } else {
    const rawData = await prisma.$queryRaw<ConvertibleData[]>`
    SELECT 
      TO_CHAR(COALESCE(m.mileage_date, r.fee_date), 'YYYY-MM') AS year_month,
      c.label AS car_number,
      COALESCE(SUM(m.mileage), 0) AS mileage_total_mileage,
      COALESCE(SUM(r.refueling_amount), 0) AS refueling_total_amount
    FROM "Car" c
   LEFT JOIN "Mileage" m ON c.label = m.car_label AND TO_CHAR(m.mileage_date, 'YYYY-MM') = ${yearMonth}
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
    return await prismaExecute(async () => {
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
      const res = await getGasMileageData(carNumber, yearMonth);
      console.log(res);
      return NextResponse.json({ success: true, res }, { status: 200 });
    });
  } catch (err) {
    console.error("Error fetching aggregated data:", err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
