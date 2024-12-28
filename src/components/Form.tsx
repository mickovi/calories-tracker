import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activityReducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

const initialState: Activity = {
  id: uuidv4(),
  category: 0,
  name: "",
  calories: 0,
};

export default function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);

  // Para editar
  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId, state.activities]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { category, name, calories } = activity;
    // TODO: agregar la condicion que mientras no se modifique los campos no se active el boton
    return category !== 0 && name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.activeId)
      dispatch({ type: "update-activity", payload: { updatedActivity: activity } });
    else
      dispatch({ type: "save-activity", payload: { newActivity: activity } });

    setActivity({
      ...initialState,
      id: uuidv4(),
    });
  };

  return (
    <>
      <form
        className="space-y-5 bg-white shadow p-10 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="category" className="font-bold">
            Category:
          </label>
          <select
            name="category"
            id="category"
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            value={activity.category}
            onChange={handleChange}
          >
            <option value={0} disabled></option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="name" className="font-bold">
            Activity:
          </label>
          <input
            id="name"
            type="text"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Brazos con mancuernas, pasta, jugo de naranja, etc"
            value={activity.name}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="calories" className="font-bold">
            Calories:
          </label>
          <input
            id="calories"
            type="number"
            min="0"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="0"
            value={activity.calories}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer rounded-lg disabled:opacity-10"
          value="Save Record"
          disabled={!isValidActivity()}
        />
      </form>
    </>
  );
}
