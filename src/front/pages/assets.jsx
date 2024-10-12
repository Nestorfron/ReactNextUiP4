import React, { useContext, useState, useMemo } from "react";
import { Context } from "../store/AppContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableColumn,
  Input,
  Pagination,
} from "@nextui-org/react";
import { DeleteIcon } from "../components/DeleteIcon.jsx"
import { SearchIcon } from "../components/SearchIcon.jsx";
import { CreateAssets } from "../components/CreateAsset.jsx";
import { EditAssets } from "../components/EditAssets.jsx";
export const Assets = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const filteredItems = useMemo(() => {
    let filteredAssets = [...store.assets];

    if (filterValue) {
      filteredAssets = filteredAssets.filter((asset) =>
        asset.asset_type.toLowerCase().includes(filterValue.toLowerCase()) ||
        asset.asset_brand.toLowerCase().includes(filterValue.toLowerCase())||
        asset.asset_model.toLowerCase().includes(filterValue.toLowerCase()) ||
        asset.asset_serial.toLowerCase().includes(filterValue.toLowerCase()) ||
        asset.asset_inventory_number.toLowerCase().includes(filterValue.toLowerCase()) ||
        asset.asset_provider.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    // Asegúrate de que 'status' esté en tus datos para filtrar adecuadamente
    if (statusFilter !== "all") {
      filteredAssets = filteredAssets.filter(
        (asset) => asset.asset_type === statusFilter 
      );
    }

    return filteredAssets;
  }, [store.assets, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [page, filteredItems, rowsPerPage]);

  const deleteAsset = (id) => {
    Swal.fire({
      title: "Advertencia",
      text: "¿Desea eliminar el Activo?",
      icon: "warning",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "Sí",
    }).then((click) => {
      if (click.isConfirmed) {
        actions.deleteAsset(id).then(() => {
          Swal.fire("Activo eliminado correctamente", "", "success");
        });
      }
    });
  };

  const topContent = (
    <div className="flex justify-end gap-3 items-center">
      <div className="flex gap-2 items-center">
        <Input
          isClearable
          placeholder="Buscar..."
          value={filterValue}
          onClear={() => setFilterValue("")}
          onValueChange={setFilterValue}
          className="w-full sm:max-w-[44%]"
          startContent={<SearchIcon />}
        />
      </div>
      <div>
        <CreateAssets />
      </div>
    </div>
  );

  const bottomContent = (
    <div className="flex justify-center mt-4">
      <Pagination showControls page={page} total={pages} onChange={setPage} />
    </div>
  );

  return (
    <>
      <div className="flex justify-start gap-4 mt-4">
        <span className="text-lg font-bold">Gestor de Activos</span>
      </div>
      {items.length === 0 && (
        <div className="text-center mt-4">No se encontraron activos</div>
      )}
      <Table
        aria-label="Tabla de activos"
        isHeaderSticky
        topContent={topContent}
        bottomContent={bottomContent}
      >
        <TableHeader>
          <TableColumn>Tipo</TableColumn>
          <TableColumn>Marca</TableColumn>
          <TableColumn>Modelo</TableColumn>
          <TableColumn>No. Serial</TableColumn>
          <TableColumn>No. Inventario</TableColumn>
            <TableColumn>Proveedor</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((asset) => (
            <TableRow key={asset.id}>
                <TableCell>{asset.asset_type}</TableCell>
                <TableCell>{asset.asset_brand}</TableCell>
                <TableCell>{asset.asset_model}</TableCell>
                <TableCell>{asset.asset_serial}</TableCell>
                <TableCell>{asset.asset_inventory_number}</TableCell>
                <TableCell>{asset.asset_provider}</TableCell> 
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="link" color="danger">
                    <span
                      className="text-lg text-danger cursor-pointer"
                      onClick={() => deleteAsset(asset.id)}
                    >
                      <DeleteIcon />
                    </span>
                  </Button>
                  <EditAssets asset={asset} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
