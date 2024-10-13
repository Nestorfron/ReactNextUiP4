import React from "react";
import { FormProviders } from "./FormProviders.jsx";
import { Button, Modal, useDisclosure } from "@nextui-org/react";

export const EditProviders = ({ provider }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!provider) {
    return <p>No se encontró el proveedor</p>;
  }

  return (
    <>
      <Button auto onClick={onOpen}>
        <i className="fa-solid fa-pencil"></i>
      </Button>

      <Modal open={isOpen} onClose={onClose}>
        <Modal.Header>
          <h5>Editar Proveedor</h5>
        </Modal.Header>
        <Modal.Body>
          <FormProviders
            btnProvider={"Actualizar"}
            provider={provider}
            id={provider.id}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto color="secondary" onClick={onClose}>
            Cerrar
          </Button>
          <Button auto onClick={onClose}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
