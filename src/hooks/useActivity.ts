import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context)
    throw new Error("The hook useActivity must be within an ActivityProvider");
  return context;
};
