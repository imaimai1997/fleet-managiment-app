import { Form } from "@/components/Form/Car";
import {
  CarType,
  Employee,
  EtcCard,
  LeasingCompany,
  Place,
  RefuelingCard,
} from "@/types/Car";

/**
 * 車種を返します。
 *
 * @returns {Promise<CarType[]>} 車種の配列
 */
async function fetchCarTypes(): Promise<CarType[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/select/cartype`,
  );
  const { cartype } = await response.json();
  return cartype;
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
  const { leasingCompanyes } = await response.json();
  return leasingCompanyes;
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
  const { refueling_cards } = await res.json();
  return refueling_cards;
}

/**
 * ETCカードを返します。
 *
 * @returns {Promise<EtcCard[]>} ETCカードの配列
 */
async function fetchEtcCards(): Promise<EtcCard[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/select/etc`);
  const { etc_cards } = await res.json();
  return etc_cards;
}

export default async function CreateCarPage() {
  const carTypes = await fetchCarTypes();
  const places = await fetchPlaces();
  const employees = await fetchEmployees();
  const leasingCompanies = await fetchLeasingCompanies();
  const refuelingCards = await fetchRefuelingCards();
  const etcCards = await fetchEtcCards();

  return (
    <Form
      carTypes={carTypes}
      places={places}
      employees={employees}
      leasingCompanies={leasingCompanies}
      refuelingCards={refuelingCards}
      etcCards={etcCards}
    />
  );
}
