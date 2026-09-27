"use client";

import { useContext } from "react";

import PlanTabs from "@/components/myPlan/planTab";
import { FitLogContext } from "@/context/FitLogContext";

const MyPlanPage = () => {
  const context = useContext(FitLogContext);

  if (!context) {
    return null;
  }

  const {
    planItems,
    savedItems,
    planCount,
    removeFromPlan,
    markAsDone,
    removeSavedWorkout,
  } = context;

  // Total minutes
  const totalMinutes = planItems.reduce(
    (total, workout) =>
      total + Number(workout.duration || 0),
    0
  );

  // Total calories
  const totalCalories = planItems.reduce(
    (total, workout) =>
      total + Number(workout.caloriesBurned || 0),
    0
  );

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div>
          <p className="text-sm font-semibold tracking-[0.25em] text-gray-400">
            FITLOG
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            MY PLAN
          </h1>

          <p className="mt-4 max-w-2xl text-gray-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Exercises */}
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-6">
            <p className="text-sm tracking-wider text-gray-400">
              EXERCISES
            </p>

            <p className="mt-3 text-3xl font-bold text-white">
              {planCount}
            </p>
          </div>

          {/* Minutes */}
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-6">
            <p className="text-sm tracking-wider text-gray-400">
              MINUTES
            </p>

            <p className="mt-3 text-3xl font-bold text-white">
              {totalMinutes}
            </p>
          </div>

          {/* Calories */}
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-6">
            <p className="text-sm tracking-wider text-gray-400">
              CALORIES
            </p>

            <p className="mt-3 text-3xl font-bold text-white">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <PlanTabs
          planItems={planItems}
          savedItems={savedItems}
          removeFromPlan={removeFromPlan}
          markAsDone={markAsDone}
          removeSavedWorkout={removeSavedWorkout}
        />
      </div>
    </main>
  );
};

export default MyPlanPage;