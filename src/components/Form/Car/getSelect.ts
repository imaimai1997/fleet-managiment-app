import {
  CarType,
  Employee,
  EtcCard,
  LeasingCompany,
  Place,
  RefuelingCard,
} from "@/type/Car";

/**
 * 車種を返します。
 *
 * @returns {Promise<CarType[]>} 車種の配列
 */
async function fetchCarTypes(): Promise<CarType[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/select/cartype`,
  );
  const { carTypes } = await response.json();
  return carTypes;
}

/**
 * 使用場所を返します。
 *
 * @returns {Promise<Place[]>} 使用場所の配列
 */
async function fetchPlaces(): Promise<Place[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/select/place`,
  );
  const { places } = await response.json();
  return places;
}

/**
 * 管理者を返します。
 *
 * @returns {Promise<Employee[]>} 管理者の配列
 */
async function fetchEmployees(): Promise<Employee[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/select/employee`,
  );
  const { employees } = await response.json();
  return employees;
}

/**
 * リース会社を返します。
 *
 * @returns {Promise<LeasingCompany[]>} リース会社の配列
 */
async function fetchLeasingCompanies(): Promise<LeasingCompany[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/select/company`,
  );
  const { leasingCompanies } = await response.json();
  return leasingCompanies;
}
/**
 * 給油カードを返します。
 *
 * @returns {Promise<RefuelingCard[]>} 給油カードの配列
 */
async function fetchRefuelingCards(): Promise<RefuelingCard[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/select/refueling`,
  );
  const { refuelingCards } = await res.json();
  return refuelingCards;
}

/**
 * ETCカードを返します。
 *
 * @returns {Promise<EtcCard[]>} ETCカードの配列
 */
async function fetchEtcCards(): Promise<EtcCard[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/select/etc`);
  const { etcCards } = await res.json();
  return etcCards;
}

export async function getSelect() {
  try {
    const [
      carTypes,
      places,
      employees,
      leasingCompanies,
      refuelingCards,
      etcCards,
    ] = await Promise.all([
      fetchCarTypes(),
      fetchPlaces(),
      fetchEmployees(),
      fetchLeasingCompanies(),
      fetchRefuelingCards(),
      fetchEtcCards(),
    ]);

    return {
      carTypes,
      places,
      employees,
      leasingCompanies,
      refuelingCards,
      etcCards,
    };
  } catch (err) {
    console.error("getSelect error:", err);
    return {
      carTypes: [],
      places: [],
      employees: [],
      leasingCompanies: [],
      refuelingCards: [],
      etcCards: [],
    };
  }
}
