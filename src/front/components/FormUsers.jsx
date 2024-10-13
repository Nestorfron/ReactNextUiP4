import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/AppContext";
import { Input, Button, Spacer, Switch, ModalFooter } from "@nextui-org/react";
import Swal from "sweetalert2";

export const FormUsers = ({ id, btnUser, user: initialUser }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    user_name: "",
    password: "",
    names: "",
    last_names: "",
    employee_number: "",
    subzone: "",
    role: "",
    is_active: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const setIs_activeOnOff = (checked) => {
    setUser({ ...user, is_active: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Cargando...",
      text: id ? "Espere mientras se actualiza el usuario" : "Espere mientras se crea el usuario",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    
    try {
      const response = id
        ? await actions.editUser(
            id,
            user.user_name,
            user.password,
            user.names,
            user.last_names,
            user.employee_number,
            user.subzone,
            user.is_active,
            user.role
          )
        : await actions.register(
            user.user_name,
            user.password,
            user.names,
            user.last_names,
            user.employee_number,
            user.subzone,
            user.is_active,
            user.role
          );
      Swal.fire({
        position: "center",
        icon: "success",
        title: id ? "Usuario Actualizado" : "Usuario creado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      if (!id) {
        setUser({
          user_name: "",
          password: "",
          names: "",
          last_names: "",
          employee_number: "",
          subzone: "",
          role: "",
          is_active: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Hubo un problema: ${error.message}`,
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
    actions.getUsers();
    if (initialUser) {
      setUser({
        user_name: initialUser.user_name || "",
        names: initialUser.names || "",
        last_names: initialUser.last_names || "",
        employee_number: initialUser.employee_number || "",
        subzone: initialUser.subzone || "",
        role: initialUser.role || "",
        is_active: initialUser.is_active || false,
      });
    }
  }, [initialUser, actions, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <Input
          label="Nombre de Usuario"
          placeholder="Ingrese el nombre de usuario"
          name="user_name"
          value={user.user_name}
          onChange={handleChange}
          required
        />
        <Input
          label="Contraseña"
          placeholder="Ingrese la contraseña"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <Input
          label="Nombres"
          placeholder="Ingrese los nombres"
          name="names"
          value={user.names}
          onChange={handleChange}
          required
        />
        <Input
          label="Apellidos"
          placeholder="Ingrese los apellidos"
          name="last_names"
          value={user.last_names}
          onChange={handleChange}
          required
        />
        <Input
          label="Número de Empleado"
          placeholder="Ingrese el número de empleado"
          name="employee_number"
          value={user.employee_number}
          onChange={handleChange}
          required
        />
        <Input
          label="Subzona"
          placeholder="Ingrese la subzona"
          name="subzone"
          value={user.subzone}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={user.role}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un rol</option>
          {store.role.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
        <div className="flex items-center">
          <Switch
            checked={user.is_active}
            onChange={(e) => setIs_activeOnOff(e.target.checked)}
          />
          <label className="ml-2">Activo</label>
        </div>
      </div>
      <Spacer />

      <ModalFooter>
      <Button type="submit" color="primary" disabled={loading}>
        {btnUser}
      </Button>
      </ModalFooter>
    </form>
  );
};
