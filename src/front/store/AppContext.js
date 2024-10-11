import React, { useState, useEffect } from "react";
import getState from "./flux";

export const Context = React.createContext(null);

const AppContext = ({ children }) => {
  const [state, setState] = useState(
    getState({
      getStore: () => state.store,
      getActions: () => state.actions,
      setStore: (updatedStore) =>
        setState({
          store: Object.assign(state.store, updatedStore),
          actions: { ...state.actions },
        }),
    })
  );

  useEffect(() => {
  }, []);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default AppContext;
