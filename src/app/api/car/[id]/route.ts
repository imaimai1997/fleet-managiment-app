import { PrismaClient } from "@prisma/client";
import { main } from "../route";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: Request) => {
  const id = parseInt(req.url.split("/car/")[1]);
  try {
    await main();
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
    return NextResponse.json(
      { message: "Success", car },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return (
      NextResponse.json({ message: "Error", err }),
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: Request) => {
  const id = parseInt(req.url.split("/car/")[1]);
  try {
    await main();
    const car = await prisma.car.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: "Success", car },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return (
      NextResponse.json({ message: "Error", err }),
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
};
