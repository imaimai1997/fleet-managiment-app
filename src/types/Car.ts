/* 車種 */
export type CarType = {
  id: number;
  name: string;
};

/* 使用場所 */
export type Place = {
  id: number;
  name: string;
};

/* 管理者 */
export type Employee = {
  id: number;
  name: string;
  email: string;
};

/* リース会社 */
export type LeasingCompany = {
  id: number;
  name: string;
};

/* 給油カード */
export type RefuelingCard = {
  id: number;
  number: string;
  period: Date;
};

/* ETCカード */
export type EtcCard = {
  id: number;
  number: string;
  name: string;
  period: Date;
};
