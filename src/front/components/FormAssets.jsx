import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/AppContext";
import { Input, Button, Spacer, ModalFooter } from "@nextui-org/react";
import Swal from "sweetalert2";

export const FormAssets = ({ id, btnAsset, asset: initialAsset }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [asset, setAsset] = useState({
      asset_type: "",
      asset_brand: "",
      asset_model: "",
      asset_serial: "",
      asset_inventory_number: "",
      provider_id: "",
    });
  
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e) => {
      setAsset({ ...asset, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      Swal.fire({
        title: "Cargando...",
        text: id
          ? "Espere mientras se actualiza el Activo"
          : "espere mientras se crea el Activo",
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
          ? await actions.editAsset(
              id,
              asset.asset_type,
              asset.asset_brand,
              asset.asset_model,
              asset.asset_serial,
              asset.asset_inventory_number,
              asset.provider_id
            )
          : await actions.add_asset(
              asset.asset_type,
              asset.asset_brand,
              asset.asset_model,
              asset.asset_serial,
              asset.asset_inventory_number,
              asset.provider_id
            );
        Swal.fire({
          position: "center",
          icon: "success",
          title: id ? "Activo Actualizado" : "Activo creado correctamente",
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
          setAsset({
            asset_type: "",
            asset_brand: "",
            asset_model: "",
            asset_serial: "",
            asset_inventory_number: "",
            provider_id: "",
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
      actions.getAssets();
      if (initialAsset) {
        setAsset({
          asset_type: initialAsset.asset_type || "",
          asset_brand: initialAsset.asset_brand || "",
          asset_model: initialAsset.asset_model || "",
          asset_serial: initialAsset.asset_serial || "",
          asset_inventory_number: initialAsset.asset_inventory_number || "",
          provider_id: initialAsset.provider_id,
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
