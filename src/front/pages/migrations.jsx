import React, { useContext, useState, useMemo } from "react";
import { Context } from "../store/AppContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { DeleteIcon } from "../components/DeleteIcon.jsx";
import { SearchIcon } from "../components/SearchIcon.jsx";
import { CreateMigrations } from "../components/CreateMigration.jsx";
import { EditMigrations } from "../components/EditMigrations.jsx";
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
  
export const Migrations = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const filteredItems = useMemo(() => {
    let filteredMigrations = [...store.migrations];

    if (filterValue) {
      filteredMigrations = filteredMigrations.filter((migration) =>
        migration.installation_date.toLowerCase().includes(filterValue.toLowerCase())||
        migration.migration_date.toLowerCase().includes(filterValue.toLowerCase())||
        migration.migration_description.toLowerCase().includes(filterValue.toLowerCase())||
        migration.migration_status.toLowerCase().includes(filterValue.toLowerCase())||
        migration.provider_id.toLowerCase().includes(filterValue.toLowerCase())||
        migration.branch_id.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    // Asegúrate de que 'status' esté en tus datos para filtrar adecuadamente
    if (statusFilter !== "all") {
      filteredMigrations = filteredMigrations.filter(
        (migration) => migration.status === statusFilter // Cambia según tus datos
      );
    }

    return filteredMigrations;
  }, [store.migrations, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [page, filteredItems, rowsPerPage]);

  const deleteMigration = (id) => {
    Swal.fire({
      title: "Advertencia",
      text: "¿Desea eliminar la Migracion?",
      icon: "warning",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "Sí",
    }).then((click) => {
      if (click.isConfirmed) {
        actions.deleteMigration(id).then(() => {
          Swal.fire("Migracion eliminada correctamente", "", "success");
        });
      }
    });
  };

  const topContent = (
    <div className="flex justify-between gap-3 items-center">
         <div className="flex justify-start gap-3 items-center">
    <span className="text-default-400 text-lg">Total de Migraciones : {store.migrations.length}</span>
    </div>
      <div className="flex gap-2 items-center">
        <Input
          isClearable
          placeholder="Buscar por Sucursal..."
          value={filterValue}
          onClear={() => setFilterValue("")}
          onValueChange={setFilterValue}
          className="w-full"
          startContent={<SearchIcon />}
        />
        <div >
        <CreateMigrations />
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
        <span className="text-lg font-bold">Gestor de Migraciones</span>
      </div>
      {items.length === 0 && (
        <div className="text-center mt-4">No se encontraron migraciones</div>
      )}
      <Table
        aria-label="Tabla de sucursales"
        isHeaderSticky
        topContent={topContent}
        bottomContent={bottomContent}
      >
        <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Fecha de Instalación</TableColumn>
            <TableColumn>Fecha de Migración</TableColumn>
            <TableColumn>Descripción de Migración</TableColumn>
            <TableColumn>Estado de Migración</TableColumn>
            <TableColumn>ID de Usuario</TableColumn>
            <TableColumn>Proveedor</TableColumn>
            <TableColumn>Sucursal</TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((migration) => (
            <TableRow key={migration.id}>
              <TableCell>{migration.id}</TableCell>
                <TableCell>{migration.installation_date}</TableCell>
                <TableCell>{migration.migration_date}</TableCell>
                <TableCell>{migration.migration_description}</TableCell>
                <TableCell>{migration.migration_status}</TableCell>
                <TableCell>{migration.user_id}</TableCell>
                <TableCell>{migration.provider_id}</TableCell>
                <TableCell>{migration.branch_id}</TableCell>
              
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="link" color="danger">
                    <span
                      className="text-lg text-danger cursor-pointer"
                      onClick={() => deleteMigration(migration.id)}
                    >
                      <DeleteIcon />
                    </span>
                  </Button>
                  <EditMigrations migration={migration} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
