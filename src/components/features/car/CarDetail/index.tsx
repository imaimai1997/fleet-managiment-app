"use client";
import { Toaster } from "react-hot-toast";
import { CarData } from "@/types/CarData";
import { CarType, Employee, EtcCard, LeasingCompany, Place, RefuelingCard } from "@/types/Car";
import { useAuthContext } from "@/context/authContext";
import { useCarForm } from "./_hooks/useCarForm";
import CarInfoSection from "./_components/CarInfoSection";
import ManagerInfoSection from "./_components/ManagerInfoSection";
import LeaseInfoSection from "./_components/LeaseInfoSection";
import MaintenanceSection from "./_components/MaintenanceSection";
import CarInspectionSection from "./_components/CarInspectionSection";
import InsuranceSection from "./_components/InsuranceSection";
import CardInfoSection from "./_components/CardInfoSection";
import NotesSection from "./_components/NotesSection";
import ActionBar from "./_components/ActionBar";

type Props = {
  data?: CarData;
  id?: string;
  carTypes: CarType[];
  places: Place[];
  employees: Employee[];
  leasingCompanies: LeasingCompany[];
  refuelingCards: RefuelingCard[];
  etcCards: EtcCard[];
};

const CarDetail = ({
  data, id, carTypes, places, employees, leasingCompanies, refuelingCards, etcCards,
}: Props) => {
  const { currentUser } = useAuthContext();
  const userRole = currentUser?.roleName;

  const {
    register, handleSubmit, watch,
    inspectionFileRef, insuaranceFileRef,
    inspectionFileName, inspectionFileURL,
    insuaranceFileName, insuaranceFileURL,
    handleInspectionFileChange, handleInsuaranceFileChange,
    showInspectionFolder, showInsuranceFolder,
    handleCreateCar, handleDeleteCar, handleUpdateCar,
    onError,
  } = useCarForm({ data, id, employees, refuelingCards, etcCards });

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(handleCreateCar, onError)}>
        <div className="grid grid-cols-2 gap-4 m-4 [&_input]:w-full [&_select]:w-full [&_input]:border-2 [&_input]:border-gray-200 [&_input]:p-2 [&_input]:mb-2 [&_select]:border-2 [&_select]:border-gray-200 [&_select]:p-2 [&_select]:mb-2">
          <CarInfoSection register={register} watch={watch} carTypes={carTypes} places={places} />
          <ManagerInfoSection register={register} watch={watch} employees={employees} />
          <LeaseInfoSection register={register} leasingCompanies={leasingCompanies} />
          <MaintenanceSection register={register} watch={watch} />
          <CarInspectionSection
            register={register}
            inspectionFileName={inspectionFileName}
            inspectionFileURL={inspectionFileURL}
            inspectionFileRef={inspectionFileRef}
            onFileChange={handleInspectionFileChange}
            onShowFolder={showInspectionFolder}
          />
          <InsuranceSection
            register={register}
            insuaranceFileName={insuaranceFileName}
            insuaranceFileURL={insuaranceFileURL}
            insuaranceFileRef={insuaranceFileRef}
            onFileChange={handleInsuaranceFileChange}
            onShowFolder={showInsuranceFolder}
          />
          <CardInfoSection register={register} watch={watch} refuelingCards={refuelingCards} etcCards={etcCards} />
        </div>
        <NotesSection register={register} />
        {!data && <ActionBar mode="create" />}
      </form>
      {data && userRole === "管理者" && (
        <ActionBar mode="edit" onDelete={handleDeleteCar} onUpdate={handleUpdateCar} />
      )}
    </>
  );
};

export default CarDetail;
