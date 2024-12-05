import React from "react";
import { RxUpload } from "react-icons/rx";
import { CiImport } from "react-icons/ci";
import PrimaryButton from "../PrimaryButton";

const Import = () => {
  return (
    <div className="w-5/6 mx-auto">
      <form>
        <fieldset>
          <div className="flex flex-col [&_input]:mr-2 [&_input]:mb-2">
            <label>
              <input type="radio" name="format" />
              リース料金
            </label>
            <label>
              <input type="radio" name="format" />
              ETC料金
            </label>
            <label>
              <input type="radio" name="format" />
              給油料金
            </label>
          </div>
        </fieldset>
        <div className="flex items-center mt-6 text-primary-700 ">
          <p>テンプレートをダウンロード</p>
          <RxUpload />
        </div>
        <div className="w-full h-40 flex flex-col justify-center items-center bg-gray-200 border-2 border-dotted border-primary-700">
          <input type="file" className="hidden" />
          <p>
            ここにファイルをドラッグ＆ドロップ　またはクリックしてファイルを選択
          </p>
          <CiImport size={36} />
        </div>
        <div className="my-8">
          <PrimaryButton name="取込" />
        </div>
      </form>
    </div>
  );
};

export default Import;
