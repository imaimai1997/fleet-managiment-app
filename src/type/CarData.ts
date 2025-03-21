export type CarData = {
  id: string;
  label: string;
  carType: {
    id: number;
    name: string;
  };
  employee: {
    id: number;
    name: string;
    email: string;
  };
  place: {
    id: number;
    name: string;
  };
  leasing: {
    id: number;
    name: string;
  };
  first_registration_date: Date;
  leasing_start_date: Date;
  leasing_finish_date: Date;
  harf_year_inspection: string;
  inspection_expires_date: Date;
  inspection_data?: string;
  inspection_data_name?: string;
  insuarance_expires_date: Date;
  insuarance_data?: string;
  insuarance_data_name?: string;
  refueling_card: {
    id: string;
    number: string;
    period: Date;
  };
  etc_card: {
    id: number;
    number: string;
    name: string;
    period: Date;
  };
  tire_change: boolean;
  notes?: string;
  // created_at: Date;
  // updated_at: Date;
};
