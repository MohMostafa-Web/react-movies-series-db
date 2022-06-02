import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [bottomNavIndex, setBottomNavIndex] = useState(null);

  /* Create function that accepts array of selected geners and return a string of ids */
  const genresIdsForURL = (selectedGeneresArr) => {
    if (selectedGeneresArr?.length < 1) return;
    else return selectedGeneresArr?.map((g) => g.id).join();
  };

  return (
    <AppContext.Provider
      value={{
        bottomNavIndex,
        setBottomNavIndex,
        genresIdsForURL,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
