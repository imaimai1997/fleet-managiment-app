import {
  CarType,
  Employee,
  EtcCard,
  LeasingCompany,
  Place,
  RefuelingCard,
} from "@/types/Car";

export type FormValues = {
  label: string | undefined;
  carTypeName: string | undefined;
  employeeName: string | undefined;
  employeeEmail: string | undefined;
  placeName: string | undefined;
  leasingName: string | undefined;
  first_registration_date: string | undefined;
  leasing_start_date: string | undefined;
  leasing_finish_date: string | undefined;
  harf_year_inspection: string | undefined;
  inspection_expires_date: string | undefined;
  inspection_data: string | undefined;
  inspection_data_name: string | undefined;
  insuarance_expires_date: string | undefined;
  insuarance_data: string | undefined;
  insuarance_data_name: string | undefined;
  refueling_cardNumber: string | undefined;
  refueling_cardPeriod: string | Date | undefined;
  etc_cardName: string | number | undefined;
  etc_cardNumber: string | number | undefined;
  etc_cardPeriod: string | Date | undefined;
  tire_change: string | null;
  notes: string | undefined;
};

export type FormProps = {
  carTypes: CarType[];
  places: Place[];
  employees: Employee[];
  leasingCompanies: LeasingCompany[];
  refuelingCards: RefuelingCard[];
  etcCards: EtcCard[];
};
