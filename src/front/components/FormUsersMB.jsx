import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/AppContext";
import { Input, Button, Spacer, ModalFooter, user } from "@nextui-org/react";
import Swal from "sweetalert2";

export const FormUsers_MB = ({ id, btnUserMB, userMB: initialUserMB }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [userMB, setUserMB] = useState({
        id: "",
        user_name_MB: "",
        is_active: "",
        names: "",
        last_names: "",
        employee_number: "",
        branch_id: "",
        asset_id: "",
     
    });
  
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e) => {
      setUserMB({ ...userMB, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      Swal.fire({
        title: "Cargando...",
        text: id
          ? "Espere mientras se actualiza el Usuario MB"
          : "espere mientras se crea el Usuario MB",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
        customClass: {
          container: "custom-container",
          popup: "custom-popup",
          title: "custom-title",
          content: "custom-content",
          confirmButton: "custom-confirm-button",
        },
      });
      try {
        const response = id
          ? await actions.editUser_MB(
            id,
                userMB.user_name_MB,
                userMB.is_active,
                userMB.names,
                userMB.last_names,
                userMB.employee_number,
                userMB.branch_id,
                userMB.asset_id
            )
          : await actions.add_User_MB(
            userMB.user_name_MB,
            userMB.is_active,
            userMB.names,
            userMB.last_names,
            userMB.employee_number,
            userMB.branch_id,
            userMB.asset_id
            );

        Swal.fire({
          position: "center",
          icon: "success",
          title: id ? "Usuario MB Actualizado" : "Usuario MB creado correctamente",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            container: "custom-container",
            popup: "custom-popup",
            title: "custom-title",
            content: "custom-content",
            confirmButton: "custom-confirm-button",
          },
        }).then(() => {});
        if (!id) {
          setUserMB({
            user_name_MB: "",
            is_active: "",
            names: "",
            last_names: "",
            employee_number: "",
            branch_id: "",
            asset_id: "",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Hubo un problema: ${error.message}`,
          customClass: {
            container: "custom-container",
            popup: "custom-popup",
            title: "custom-title",
            content: "custom-content",
            confirmButton: "custom-confirm-button",
          },
        });
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      const jwt = localStorage.getItem("token");
      if (!jwt) {
        navigate("/");
        return;
      }
      actions.getUsersMB();
      if (initialUserMB) {
        setAsset({
            user_name_MB: initialUserMB.user_name_MB || "",
            is_active: initialUserMB.is_active || "",
            names: initialUserMB.names || "",
            last_names: initialUserMB.last_names || "",
            employee_number: initialUserMB.employee_number || "",
            branch_id: initialUserMB.branch_id || "",
            asset_id: initialUserMB.asset_id || "",
        });
      }
    }, []);
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <Input
          label="Tipo de Activo"
          placeholder="Ingrese el Tipo de Activo"
          labelPlacement="outside"
          name="asset_type"
          value={asset.asset_type}
          onChange={handleChange}
          required
        />
        <Input
          label="Marca"
          placeholder="Ingrese la marca"
          labelPlacement="outside"
          name="asset_brand"
          value={asset.asset_brand}
          onChange={handleChange}
          required
        />
        <Input
          label="Modelo"
          placeholder="Ingrese el modelo"
          labelPlacement="outside"
          name="asset_model"
          value={asset.asset_model}
          onChange={handleChange}
          required
        />
        <Input
          label="Serial"
          placeholder="Ingrese el serial"
          labelPlacement="outside"
          name="asset_serial"
          value={asset.asset_serial}
          onChange={handleChange}
          required
        />
        <Input
          label="Numero de Inventario"
          placeholder="Ingrese el numero de inventario"
          labelPlacement="outside"
          name="asset_inventory_number"
          value={asset.asset_inventory_number}
          onChange={handleChange}
          required
        />
        
      </div>
      
      <Spacer />
      <ModalFooter>
        <Button type="submit" color="primary" disabled={loading}>
          {btnAsset}
        </Button>
      </ModalFooter>
    </form>
  );
};
