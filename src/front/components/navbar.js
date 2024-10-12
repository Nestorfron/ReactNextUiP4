import React, { useContext, useState } from "react";
import { Context } from "../store/AppContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { Button } from "@nextui-org/button";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
// import img from "../../img/drapp_logo.png";

import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  
} from "@nextui-org/navbar";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";

export const NavBar = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();
  const [isDark, setIsDark] = useState(theme === "dark");

  const logout = (e) => {
    e.preventDefault(); 
    actions.logout();
    navigate("/");
  };

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    setIsDark(!isDark);
  };

  return (
    <NextUINavbar isBordered maxWidth="xl" position="sticky">
      <NavbarContent className="" justify="start">
      <NavbarMenuToggle size="lg" className="sm:hidden" />

        <NavbarBrand className="gap-3 max-w-fit ">
          <button
            className="flex justify-start items-center gap-1 "
            color="foreground"
            to="/"
          >
            {/* <Avatar src={img} alt="DR-App" className="h-12 w-15 " /> */}
          </button>
        </NavbarBrand>
        <div className="hidden sm:flex gap-4 justify- ml-2">
          <NavbarContent>
            <NavbarItem >
              <Button
                onClick={() => navigate("/users")}
                variant="link"
                
               
              >
                Usuarios
              </Button>
            </NavbarItem>
            <NavbarItem className="gap-2" >
              <Button
                onClick={() => navigate("/branches")}
                variant="link"
              
              >
                Sucursales
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                onClick={() => navigate("/provider")}
                variant="link"
                
              >
                Proveedores
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                onClick={() => navigate("/assets")}
                variant="link"
               
              >
                Activos
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                onClick={() => navigate("/usersMb")}
                variant="link"
               
              >
                Usuarios MB
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                onClick={() => navigate("/migrations")}
                variant="link"
               
              >
                Migraciones
              </Button>
            </NavbarItem>
          </NavbarContent>
        </div>
      </NavbarContent>
      <NavbarItem className="flex items-center">
        <button onClick={toggleTheme} >
          {isDark ? (
            <SunIcon className="h-6 w-6" color="primary" variant="shadow" />
          ) : (
            <MoonIcon className="h-6 w-6" color="primary" variant="light" />
          )}
        </button>
      </NavbarItem>
    
      <NavbarMenu>
        <ul className="flex flex-col space-y-2 p-4 bg-black">
          {[
            "users",
            "branches",
            "provider",
            "assets",
            "usersMb",
            "migrations",
          ].map((item) => (
            <li key={item}>
              <Button
                onClick={() => navigate(`/${item}`)}
                variant="link"
                className=" w-full text-left"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Button>
            </li>
          ))}
        </ul>
      </NavbarMenu>
      <NavbarItem isActive>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              color="secondary"
              name="User"
              size="md"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              className="mb-2 mt-2"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">user@example.com</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={logout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarItem>
    </NextUINavbar>
  );
};
