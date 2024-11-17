export type CarData ={
 id: string;
      car_type: string;
      employee: {
        id: number;
        name: string;
      };
      place: {
        id: 1;
        name: string;
      };
      leasing: {
        id: 1;
        name:string;
      };
      first_registration_date:Date;
      leasing_start_date: Date;
      leasing_finish_date: Date;
      harf_year_inspection: string;
      inspection_expires_date: Date;
      inspection_data?: Blob;
      insuarance_expires_date: Date;
      insuarance_data?: Blob;
      refueling_card: {
        id: string;
        period: Date;
      };
      etc_card: {
        id: number;
        name: string;
        period: Date;
      };
      tire_change: boolean;
      notes?: string;
      created_at: Date;
      updated_at: Date;
    


}