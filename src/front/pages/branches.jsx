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
import { CreateBranches } from "../components/CreateBranches.jsx";
import { EditBranches } from "../components/EditBranches.jsx";
export const Branches = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const filteredItems = useMemo(() => {
    let filteredBranches = [...store.branchs];

    if (filterValue) {
      filteredBranches = filteredBranches.filter((branch) =>
        branch.branch_cr.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    // Asegúrate de que 'status' esté en tus datos para filtrar adecuadamente
    if (statusFilter !== "all") {
      filteredBranches = filteredBranches.filter(
        (branch) => branch.status === statusFilter // Cambia según tus datos
      );
    }

    return filteredBranches;
  }, [store.branchs, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [page, filteredItems, rowsPerPage]);

  const deleteBranch = (id) => {
    Swal.fire({
      title: "Advertencia",
      text: "¿Desea eliminar la Sucursal?",
      icon: "warning",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "Sí",
    }).then((click) => {
      if (click.isConfirmed) {
        actions.deleteBranch(id).then(() => {
          Swal.fire("Sucursal eliminada correctamente", "", "success");
        });
      }
    });
  };

  const topContent = (
    <div className="flex justify-end gap-3 items-center">
      <div className="flex gap-2 items-center">
        <Input
          isClearable
          placeholder="Buscar por Sucursal..."
          value={filterValue}
          onClear={() => setFilterValue("")}
          onValueChange={setFilterValue}
          className="w-full sm:max-w-[44%]"
          startContent={<SearchIcon />}
        />
      </div>
      <div>
        <CreateBranches />
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
        <span className="text-lg font-bold">Gestor de Sucursales</span>
      </div>
      {items.length === 0 && (
        <div className="text-center mt-4">No se encontraron sucursales</div>
      )}
      <Table
        aria-label="Tabla de sucursales"
        isHeaderSticky
        topContent={topContent}
        bottomContent={bottomContent}
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Cr</TableColumn>
          <TableColumn>Zona</TableColumn>
          <TableColumn>SubZona</TableColumn>
          <TableColumn>Dirección</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((branch) => (
            <TableRow key={branch.id}>
              <TableCell>{branch.id}</TableCell>
              <TableCell>{branch.branch_cr}</TableCell>
              <TableCell>{branch.branch_zone}</TableCell>
              <TableCell>{branch.branch_subzone}</TableCell>
              <TableCell>{branch.branch_address}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="link" color="danger">
                    <span
                      className="text-lg text-danger cursor-pointer"
                      onClick={() => deleteBranch(branch.id)}
                    >
                      <DeleteIcon />
                    </span>
                  </Button>
                  <EditBranches branch={branch} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
