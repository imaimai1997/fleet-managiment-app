"use client";
import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "@/components/ui/Modal";
import UserDetail from "@/components/features/user/UserDetail";

const UserModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Modal
        open={isModalOpen}
        name="ユーザー追加"
        onCancel={() => setIsModalOpen(false)}
      >
        <UserDetail />
      </Modal>
      <Button
        rounded="md"
        className="flex gap-2 items-center justify-center"
        onClick={() => setIsModalOpen(true)}
      >
        <FaPlus />
        新規追加
      </Button>
    </>
  );
};

export default UserModal;
