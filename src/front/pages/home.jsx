import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/AppContext";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";
import img from "../img/drapp_logo.png";
import { useTheme } from "next-themes";
import "../styles/index.css";

export const Home = () => {
  const { actions } = useContext(Context);
  const { setTheme } = useTheme();
  const [selected, setSelected] = useState("login");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const success = await actions.login(userName, password);
    
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Nombre de usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="flex-col w-full m-auto mt-10">
      <Card className="mx-auto max-w-full w-[340px]">
        <CardBody className="overflow-hidden">
          <div className="img-container m-auto pb-5">
            <img src={img} alt="DR-App" height={200} width={200} />
          </div>
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Inicio de Sesión">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  isRequired
                  label="Usuario"
                  placeholder="Enter your username"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="error text-red-500">{error}</p>}
                <div className="flex gap-2 justify-end">
                  <Button type="submit" fullWidth color="primary">
                    Entrar
                  </Button>
                </div>
              </form>
            </Tab>
            
          </Tabs>
        </CardBody>
      </Card>
      
    </div>
  );
};
