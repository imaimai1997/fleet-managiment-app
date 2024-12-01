export type FeeData ={
  id: number;
    fee_date: Date;
    car: {
      label: string;
    };
    leasefee:{
      lease_fee: number;
    };
    refuelingfee:{
      refueling_fee: number;
    };
    etcfee:{
      etc_fee: number;
    }
  
 }