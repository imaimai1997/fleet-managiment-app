import { prisma, prismaExecute } from "@/lib/prisma";
import {
  CarType,
  Employee,
  EtcCard,
  LeasingCompany,
  Place,
  RefuelingCard,
} from "@/types/Car";

export async function getSelect() {
  try {
    return await prismaExecute(async () => {
      const [
        carTypes,
        places,
        employees,
        leasingCompanies,
        refuelingCards,
        etcCards,
      ] = await Promise.all([
        prisma.carType.findMany({}),
        prisma.place.findMany({}),
        prisma.employee.findMany({}),
        prisma.leasingCompany.findMany({}),
        prisma.refueling_card.findMany({}),
        prisma.etc_card.findMany({}),
      ]);

      return {
        carTypes: carTypes as CarType[],
        places: places as Place[],
        employees: employees as Employee[],
        leasingCompanies: leasingCompanies as LeasingCompany[],
        refuelingCards: refuelingCards as RefuelingCard[],
        etcCards: etcCards as EtcCard[],
      };
    });
  } catch (err) {
    console.error("getSelect error:", err);
    return {
      carTypes: [] as CarType[],
      places: [] as Place[],
      employees: [] as Employee[],
      leasingCompanies: [] as LeasingCompany[],
      refuelingCards: [] as RefuelingCard[],
      etcCards: [] as EtcCard[],
    };
  }
}
