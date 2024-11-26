"use client";
import React, { useRef } from "react";
import { CarData } from "../../type/CarData";

type Props = {
  data: CarData;
};

const CarDetail = ({ data }: Props) => {
  const filePickerRef = useRef<HTMLInputElement>(null);
  const showFolder = () => {
    if (filePickerRef.current) {
      filePickerRef.current.click();
    }
  };
  return (
    <div className="max-w-5xl  mx-auto my-20">
      <form>
        <div className="w-full grid grid-cols-2 gap-y-4 gap-x-12 *:text-xl [&_input]:w-60 [&_input]:border-2 [&_input]:border-primary-700 [&_input]:p-2  [&>div]:max-w-lg [&>div]:flex [&>div]:justify-between [&>div]:items-center">
          <div>
            <label>車両番号</label>
            <input
              className="focus:bg-gray-200"
              type="text"
              value={data.id}
              readOnly
            />
          </div>
          <div>
            <label>車種</label>
            <input type="text" value={data.car_type} onChange={() => {}} />
          </div>
          <div>
            <label>管理者</label>
            <input type="text" value={data.employee.name} onChange={() => {}} />
          </div>
          <div>
            <label>管理者アドレス</label>
            <input
              type="text"
              value={data.employee.email}
              onChange={() => {}}
            />
          </div>
          <div>
            <label>使用場所</label>
            <input type="text" value={data.place.name} onChange={() => {}} />
          </div>
          <div>
            <label>リース会社</label>
            <input type="text" value={data.leasing.name} onChange={() => {}} />
          </div>
          <div>
            <label>初度登録</label>
            <input
              type="date"
              value={
                data.leasing_start_date
                  ? new Date(data.first_registration_date)
                      .toISOString()
                      .slice(0, 10) // YYYY-MM-DD形式
                  : ""
              }
              onChange={() => {}}
            />
          </div>
          <div>
            <label>リース開始日</label>
            <input
              type="date"
              value={
                data.leasing_start_date
                  ? new Date(data.leasing_start_date).toISOString().slice(0, 10) // YYYY-MM-DD形式
                  : ""
              }
              onChange={() => {}}
            />
          </div>
          <div>
            <label>リース終了日</label>
            <input
              type="text"
              value={
                data.leasing_start_date
                  ? new Date(data.leasing_finish_date)
                      .toISOString()
                      .slice(0, 10) // YYYY-MM-DD形式
                  : ""
              }
              onChange={() => {}}
            />
          </div>
          <div>
            <label>6カ月点検日</label>
            <input
              type="text"
              value={data.harf_year_inspection}
              onChange={() => {}}
            />
          </div>
          <div>
            <label>車検日</label>
            <input
              type="date"
              value={
                data.leasing_start_date
                  ? new Date(data.inspection_expires_date)
                      .toISOString()
                      .slice(0, 10) // YYYY-MM-DD形式
                  : ""
              }
              onChange={() => {}}
            />
          </div>
          <div>
            <label>車検PDF</label>
            <div className="w-60 border-2 border-primary-700 p-2 flex justify-between items-center">
              <input
                type="file"
                ref={filePickerRef}
                accept="application/pdf"
                onChange={() => {}}
                className="hidden"
              />
              {data.inspection_data && (
                <p>{data.inspection_data_name || "inspection.pdf"}</p>
              )}
              <button onClick={showFolder} className="bg-gray-200">
                選択
              </button>
            </div>
          </div>
          <div>
            <label>保険加入日</label>
            <input
              type="date"
              value={
                data.leasing_start_date
                  ? new Date(data.insuarance_expires_date)
                      .toISOString()
                      .slice(0, 10) // YYYY-MM-DD形式
                  : ""
              }
              onChange={() => {}}
            />
          </div>
          <div>
            <label>保険PDF</label>
            <div className="w-60 border-2 border-primary-700 p-2 flex justify-between items-center">
              <input
                type="file"
                ref={filePickerRef}
                accept="application/pdf"
                onChange={() => {}}
                className="hidden"
              />
              {data.insuarance_data && (
                <p>{data.insuarance_data_name || "insuarance.pdf"}</p>
              )}
              <button onClick={showFolder} className="bg-gray-200">
                選択
              </button>
            </div>
          </div>
          <div>
            <label>給油カード番号</label>
            <input
              type="text"
              value={data.refueling_card.id}
              onChange={() => {}}
            />
          </div>
          <div>
            <label>給油カード期限</label>
            <input
              type="date"
              value={
                data.leasing_start_date
                  ? new Date(data.refueling_card.period)
                      .toISOString()
                      .slice(0, 10) // YYYY-MM-DD形式
                  : ""
              }
              onChange={() => {}}
            />
          </div>
          <div>
            <label>ETCカード番号</label>
            <input type="text" value={data.etc_card.id} onChange={() => {}} />
          </div>
          <div>
            <label>ETCカード名</label>
            <input type="text" value={data.etc_card.name} onChange={() => {}} />
          </div>
          <div>
            <label>ETCカード期限</label>
            <input
              type="date"
              value={
                data.leasing_start_date
                  ? new Date(data.etc_card.period).toISOString().slice(0, 10) // YYYY-MM-DD形式
                  : ""
              }
              onChange={() => {}}
            />
          </div>
          <div>
            <label>タイヤ交換有無</label>
            <select
              value={data.tire_change ? "有り" : "無し"}
              onChange={() => {}}
              className="w-60 border-2 border-primary-700 p-2"
            >
              <option value="true">有り</option>
              <option value="false">無し</option>
            </select>
          </div>
        </div>
        <div className=" text-xl mt-6 w-full">
          <label>備考欄</label>
          <div>
            <textarea
              className="h-24 w-full border-2 border-primary-700 p-2"
              value={data.notes}
              onChange={() => {}}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CarDetail;
