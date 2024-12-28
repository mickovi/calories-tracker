import { useEffect } from "react";
import Form from "./components/FormContext";
import ActivityList from "./components/ActivityListContext";
import CaloriesTracker from "./components/CalorieTrackerContext";
import { useActivity } from "./hooks/useActivity";

export default function App() {
  const {state, dispatch} = useActivity();

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestartApp = () => {
    return state.activities.length > 0;
  };

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Calories Tracker
          </h1>
          <button
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:bg-gray-800 disabled:opacity-75 disabled:cursor-default"
            disabled={!canRestartApp()}
            onClick={() => { dispatch({ type: "restart-app" }) }}
          >
            Restart App
          </button>
        </div>
      </header>
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form />
        </div>
      </section>
      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CaloriesTracker />
        </div>
      </section>
      <section className="px-10 py-10 mx-auto max-w-4xl">
        <ActivityList />
      </section>
    </>
  );
}
