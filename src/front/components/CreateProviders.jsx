import React, { useState } from "react";
import { FormProviders } from "./FormProviders.jsx";
import { Button, Modal, useDisclosure } from "@nextui-org/react";

export const CreateProviders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");

  return (
    <>
      <Button color="primary" auto onClick={onOpen}>
        Añadir Proveedor
        <i className="fa-solid fa-plus"></i>
      </Button>

      <Modal backdrop={backdrop} open={isOpen} onClose={onClose}>
        <Modal.Header>
          <h5>Crear Proveedor</h5>
        </Modal.Header>
        <Modal.Body>
          <FormProviders btnProvider={"Crear"} />
        </Modal.Body>
        <Modal.Footer>
          <Button auto color="secondary" onClick={onClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
