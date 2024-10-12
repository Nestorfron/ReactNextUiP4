import React, { useContext, useState, useMemo } from "react";
import { Context } from "../store/AppContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { DeleteIcon } from "../components/DeleteIcon.jsx";
import { SearchIcon } from "../components/SearchIcon.jsx";
import { CreateUsersMB } from "../components/CreateUsersMB.jsx";
import { EditUsersMB } from "../components/EditUsersMB.jsx";
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
  
export const UsersMB = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const filteredItems = useMemo(() => {
    let filteredUsersMB = [...store.usersMB];

    if (filterValue) {
      filteredUsersMB = filteredUsersMB.filter((userMB) =>
        userMB.user_name_MB.toLowerCase().includes(filterValue.toLowerCase())||
        userMB.names.toLowerCase().includes(filterValue.toLowerCase())||
        userMB.last_names.toLowerCase().includes(filterValue.toLowerCase())||
        userMB.employee_number.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    // Asegúrate de que 'status' esté en tus datos para filtrar adecuadamente
    if (statusFilter !== "all") {
      filteredUsersMB = filteredUsersMB.filter(
        (userMB) => userMB.status === statusFilter // Cambia según tus datos
      );
    }

    return filteredUsersMB;
  }, [store.usersMB, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [page, filteredItems, rowsPerPage]);

  const deleteUserMB = (id) => {
    Swal.fire({
      title: "Advertencia",
      text: "¿Desea eliminar Usuario MB?",
      icon: "warning",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "Sí",
    }).then((click) => {
      if (click.isConfirmed) {
        actions.deleteUserMB(id).then(() => {
          Swal.fire("Usuario MB eliminado correctamente", "", "success");
        });
      }
    });
  };

  const topContent = (
    <div className="flex justify-between gap-3 items-center">
         <div className="flex justify-start gap-3 items-center">
    <span className="text-default-400 text-lg">Total de Usuarios MB : {store.usersMB.length}</span>
    </div>
      <div className="flex gap-2 items-center">
        <Input
          isClearable
          placeholder="Buscar por Usuario MB..."
          value={filterValue}
          onClear={() => setFilterValue("")}
          onValueChange={setFilterValue}
          className="w-full"
          startContent={<SearchIcon />}
        />
        <div >
        <CreateUsersMB />
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
        <span className="text-lg font-bold">Gestor de Usuarios MB</span>
      </div>
      {items.length === 0 && (
        <div className="text-center mt-4">No se encontraron Usuarios MB</div>
      )}
      <Table
        aria-label="Tabla de Usuarios MB"
        isHeaderSticky
        topContent={topContent}
        bottomContent={bottomContent}
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
            <TableColumn>Nombre de Usuario MB</TableColumn>
            <TableColumn>Estado</TableColumn>
            <TableColumn>Nombres</TableColumn>
            <TableColumn>Apellidos</TableColumn>
            <TableColumn>Numero de Empleado</TableColumn>
            <TableColumn>Sucursal</TableColumn>
            <TableColumn>Activos Adjudicados</TableColumn>
            <TableColumn>Acciones</TableColumn>


          
        </TableHeader>
        <TableBody>
          {items.map((userMB) => (
            <TableRow key={userMB.id}>
              <TableCell>{userMB.id}</TableCell>
                <TableCell>{userMB.user_name_MB}</TableCell>
                <TableCell>{userMB.is_active}</TableCell>
                <TableCell>{userMB.names}</TableCell>
                <TableCell>{userMB.last_names}</TableCell>
                <TableCell>{userMB.employee_number}</TableCell>
                <TableCell>{userMB.branch_id}</TableCell>
                <TableCell>{userMB.asset_id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="link" color="danger">
                    <span
                      className="text-lg text-danger cursor-pointer"
                      onClick={() => deleteUserMB(userMB.id)}
                    >
                      <DeleteIcon />
                    </span>
                  </Button>
                  <EditUsersMB userMB={userMB} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
