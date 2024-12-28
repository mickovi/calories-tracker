import { useMemo } from "react";
import type { Activity } from "../types";
import InfoDisplay from "./InfoDisplay";

type CaloriesTrackerProps = {
  activities: Activity[];
};

export default function CaloriesTracker({ activities }: CaloriesTrackerProps) {
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );
  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );
  const totalCalories = caloriesConsumed - caloriesBurned;
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
