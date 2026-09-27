"use client";

import { useContext } from "react";
import {
  FaBookmark,
  FaCalendarPlus,
} from "react-icons/fa6";

import { FitLogContext } from "@/context/FitLogContext";
import { IWorkout } from "@/types/type";

interface WorkoutDetailsActionsProps {
  workout: IWorkout;
}

const WorkoutDetailsActions = ({
  workout,
}: WorkoutDetailsActionsProps) => {
  const context = useContext(FitLogContext);

  if (!context) {
    return null;
  }

  const {
    planItems,
    savedItems,
    addToPlan,
    saveWorkout,
  } = context;

  const isInPlan = planItems.some(
    (item) => item.id === workout.id
  );

  const isSaved = savedItems.some(
    (item) => item.id === workout.id
  );

  return (
    <div className="mt-6 flex flex-wrap gap-3">
    
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        className={`flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-xs font-semibold transition ${
          isInPlan
            ? "bg-zinc-700 text-gray-300 hover:bg-zinc-600"
            : "bg-lime-400 text-black hover:bg-lime-300"
        }`}
      >
        <FaCalendarPlus />

        {isInPlan
          ? "Added to today's plan"
          : "Add to today's plan"}
      </button>

   
      <button
        type="button"
        onClick={() => saveWorkout(workout)}
        className={`flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-xs font-semibold transition ${
          isSaved
            ? "border-lime-400 text-lime-400 hover:bg-lime-400/10"
            : "border-zinc-700 text-white hover:border-lime-400 hover:text-lime-400"
        }`}
      >
        <FaBookmark />

        {isSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
};

export default WorkoutDetailsActions;