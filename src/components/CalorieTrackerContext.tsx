import InfoDisplay from "./InfoDisplay";
import { useActivity } from "../hooks/useActivity";

export default function CaloriesTracker() {

  const { caloriesConsumed, caloriesBurned, totalCalories } = useActivity();

return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Activities Summary
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <InfoDisplay calories={caloriesConsumed} title="Calories Consumed" />
        <InfoDisplay calories={caloriesBurned} title="Calories Burned" />
        <InfoDisplay calories={totalCalories} title="Total Calories" />
      </div>
    </>
  );
}
