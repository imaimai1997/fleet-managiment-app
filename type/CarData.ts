export type CarData ={
 id: string;
 label:string;
      car_type: string;
      employee: {
        id: number;
        name: string;
        email:string;
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
      inspection_data_name?: string;
      insuarance_expires_date: Date;
      insuarance_data?: Blob;
      insuarance_data_name?: string;
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