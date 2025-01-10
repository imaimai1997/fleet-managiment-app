import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    console.error("DB接続エラー:", err);
    return new Error("DB接続に失敗しました");
  }
}

//車両一覧取得
export const GET = async () => {
  try {
    await main();
    const cars = await prisma.car.findMany({
      include: {
        carType: true,
        employee: true,
        leasing: true,
        place: true,
        etc_card: true,
        refueling_card: true,
      },
    });
    return NextResponse.json({ message: "Success", cars }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

//車両登録
export const POST = async (req: Request) => {
  const {
    label,
    carTypeName,
    employeeName,
    placeName,
    leasingName,
    first_registration_date,
    leasing_start_date,
    leasing_finish_date,
    harf_year_inspection,
    inspection_expires_date,
    inspection_data,
    inspection_data_name,
    insuarance_expires_date,
    insuarance_data,
    insuarance_data_name,
    refueling_cardNumber,
    etc_cardName,
    tire_change,
    notes,
    // created_at,
    // updated_at,
  } = await req.json();

  try {
    await main();
    const car = await prisma.car.create({
      data: {
        label,
        carTypeName,
        employeeName,
        placeName,
        leasingName,
        first_registration_date: new Date(first_registration_date),
        leasing_start_date: new Date(leasing_start_date),
        leasing_finish_date: new Date(leasing_finish_date),
        harf_year_inspection,
        inspection_expires_date: new Date(inspection_expires_date),
        inspection_data,
        inspection_data_name,
        insuarance_expires_date: new Date(insuarance_expires_date),
        insuarance_data,
        insuarance_data_name,
        refueling_cardNumber,
        etc_cardName,
        tire_change,
        notes,
        // created_at: new Date(created_at),
        // updated_at: new Date(updated_at),
      },
    });
    return NextResponse.json({ message: "Success", car }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
