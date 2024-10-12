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
        setUserMB({
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
          label="Nombre de Usuario MB"
          placeholder="Ingrese el nombre de usuario MB"
          labelPlacement="outside"
          name="user_name_MB"
          value={userMB.user_name_MB}
          onChange={handleChange}
          required
        />
        <select
            label="Estado"
            name="is_active"
            value={userMB.is_active}
            onChange={handleChange}
            required
            >
            <option value="">Seleccione el estado</option>
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
        </select>
        <Input
          label="Nombres"
          placeholder="Ingrese los nombres"
          labelPlacement="outside"
          name="names"
          value={userMB.names}
          onChange={handleChange}
          required
        />
        <Input
          label="Apellidos"
          placeholder="Ingrese los apellidos"
          labelPlacement="outside"
          name="last_names"
          value={userMB.last_names}
          onChange={handleChange}
          required
        />
        <Input
          label="Numero de Empleado"
          placeholder="Ingrese el numero de empleado"
          labelPlacement="outside"
          name="employee_number"
          value={userMB.employee_number}
          onChange={handleChange}
          required
        />

        <select
            name="branch_id"
            value={userMB.branch_id}
            onChange={handleChange}
            required
            >
            <option value="" disabled>
                Seleccione la sucursal a la que pertenece
            </option>
            {store.branchs.map((branch) => (
                <option key={branch.branch_id} value={branch.branch_id}>
                {branch.branch_cr}
                </option>
            ))}
        </select>
        
      </div>
      
      <Spacer />
      <ModalFooter>
        <Button type="submit" color="primary" disabled={loading}>
          {btnUserMB}
        </Button>
      </ModalFooter>
    </form>
  );
};
