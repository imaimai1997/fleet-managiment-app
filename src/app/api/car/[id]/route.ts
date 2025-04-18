import { prisma, prismaExecute } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const id = parseInt(req.url.split("/car/")[1]);
  try {
    return await prismaExecute(async () => {
      const car = await prisma.car.findFirst({
        where: { id: id },
        include: {
          carType: true,
          employee: true,
          leasing: true,
          place: true,
          etc_card: true,
          refueling_card: true,
        },
      });

      return NextResponse.json({ message: "Success", car }, { status: 200 });
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  const id = parseInt(req.url.split("/car/")[1]);
  try {
    return await prismaExecute(async () => {
      const car = await prisma.car.delete({
        where: { id: id },
      });
      return NextResponse.json({ message: "Success", car }, { status: 200 });
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  const id = parseInt(req.url.split("/car/")[1]);
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
  } = await req.json();

  try {
    return await prismaExecute(async () => {
      const car = await prisma.car.update({
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
        },
        where: { id: id },
      });

      return NextResponse.json({ message: "Success", car }, { status: 201 });
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
