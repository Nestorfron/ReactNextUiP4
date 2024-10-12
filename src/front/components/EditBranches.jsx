import React from "react";
import { FormBranches } from "./FormBranches.jsx";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { EditIcon } from "../components/EditIcon.jsx";
export const EditBranches = ({ branch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("blur");

  if (!branch) {
    return <p>No se encontró la sucursal</p>;
  }

  const openModal = () => onOpen();

  return (
    <>
      <Button variant="link" content="Edit sucursal" auto onClick={openModal}>
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <EditIcon />
        </span>
      </Button>

      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Editar Sucursal
          </ModalHeader>
          <ModalBody>
            <FormBranches
              btnBranch={"Actualizar"}
              branch={branch}
              id={branch.id}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
