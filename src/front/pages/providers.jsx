import React, { useContext, useMemo, useState } from "react";
import { Context } from "../store/AppContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CreateProviders } from "../components/CreateProviders.jsx";
import { EditProviders } from "../components/EditProviders.jsx";
import { DeleteIcon } from "../components/DeleteIcon.jsx";
import { SearchIcon } from "../components/SearchIcon.jsx";
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

export const Providers = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

 const filteredProviders = useMemo(() => {
    let filteredProviders = [...store.providers];

    if (filterValue) {
      filteredProviders = filteredProviders.filter((provider) =>
        provider.company_name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filteredProviders = filteredProviders.filter(
        (provider) => provider.status === statusFilter // Cambia según tus datos
      );
    }
    return filteredProviders;
  }, [store.providers, filterValue, statusFilter]);

  const pages = Math.ceil(filteredProviders.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredProviders.slice(start, start + rowsPerPage);
  }, [page, filteredProviders, rowsPerPage]);

  const deleteProvider = (id) => {
    Swal.fire({
      title: "Advertencia",
      text: "¿Desea eliminar el Proveedor?",
      icon: "warning",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "Sí",
    }).then((click) => {
      if (click.isConfirmed) {
        actions.deleteProvider(id).then(() => {
          Swal.fire("Proveedor eliminado correctamente", "", "success");
        });
      }
    });
  };

  const topContent = (
    <div className="flex justify-between gap-3 items-center">
      <div className="flex justify-start gap-3 items-center">
        <span className="text-default-400 text-lg">Total de Proveedores : {store.providers.length}</span>
      </div>
      <div className="flex gap-2 items-center">
        <Input
          isClearable
          placeholder="Buscar por Proveedor..."
          value={filterValue}
          onClear={() => setFilterValue("")}
          onValueChange={setFilterValue}
          className="w-full"
          startContent={<SearchIcon />}
        />
        <div >
        <CreateProviders />
      </div>
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
        <span className="text-lg font-bold">Gestor de Provedores</span>
      </div>
      {items.length === 0 && (
        <div className="text-center mt-4">No se encontraron provedores</div>
      )}
        <Table aria-label="Tabla de proveedores" isHeaderSticky  topContent={topContent}
        bottomContent={bottomContent}>
          <TableHeader>
            <TableColumn>#</TableColumn>
            <TableColumn>Nombre</TableColumn>
            <TableColumn>RFC</TableColumn>
            <TableColumn>Servicio</TableColumn>
            <TableColumn>Acciones</TableColumn>
          </TableHeader>
          <TableBody>
            {items.map((provider) => (
              <TableRow key={provider.id}>
                <TableCell>{provider.id}</TableCell>
                <TableCell>{provider.company_name}</TableCell>
                <TableCell>{provider.rfc}</TableCell>
                <TableCell>{provider.service}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="link" color="danger" onClick={() => deleteProvider(provider.id)}>
                      <DeleteIcon />
                    </Button>
                    <EditProviders provider={provider} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </>
  );
};
