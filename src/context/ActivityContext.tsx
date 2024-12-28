import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import {
  ActivityActions,
  activityReducer,
  ActivityState,
  initialState,
} from "../reducers/activityReducer";
import { categories } from "../data/categories";
import { Activity } from "../types";

type ActivityProviderProps = {
  children: ReactNode;
};

type ActivityContextProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityActions>;
  caloriesConsumed: number;
  caloriesBurned: number;
  totalCalories: number;
  categoryName: (category: Activity["category"]) => string[];
};

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);
  
  const caloriesConsumed = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );
  const caloriesBurned = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );
  const totalCalories = caloriesConsumed - caloriesBurned;

  const categoryName = (category: Activity["category"]) =>
    categories.map((cat) => (cat.id === category ? cat.name : ""));

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
        caloriesConsumed,
        caloriesBurned,
        totalCalories,
        categoryName,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
