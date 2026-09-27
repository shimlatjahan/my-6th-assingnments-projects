"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

import PlanCard from "./planCard";
import { IWorkout } from "@/types/type";

interface PlanTabsProps {
  planItems: IWorkout[];
  savedItems: IWorkout[];
  removeFromPlan: (id: number) => void;
  markAsDone: (id: number) => void;
  removeSavedWorkout: (id: number) => void;
}

type SortOption = "duration" | "calories" | "rating";
type TabOption = "plan" | "saved";

const PlanTabs = ({
  planItems,
  savedItems,
  removeFromPlan,
  markAsDone,
  removeSavedWorkout,
}: PlanTabsProps) => {
  const [activeTab, setActiveTab] =
    useState<TabOption>("plan");

  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  const sortWorkouts = (workouts: IWorkout[]) => {
    return [...workouts].sort((a, b) => {
      // Duration
      if (sortBy === "duration") {
        return (
          Number(a.duration || 0) -
          Number(b.duration || 0)
        );
      }

      if (sortBy === "calories") {
        return (
          Number(a.caloriesBurned || 0) -
          Number(b.caloriesBurned || 0)
        );
      }

      if (sortBy === "rating") {
        return (
          Number(a.rating || 0) -
          Number(b.rating || 0)
        );
      }

      return 0;
    });
  };

  const sortedPlanItems = useMemo(
    () => sortWorkouts(planItems),
    [planItems, sortBy]
  );

  const sortedSavedItems = useMemo(
    () => sortWorkouts(savedItems),
    [savedItems, sortBy]
  );

  return (
    <div className="mt-10">

      <div className="flex w-full items-center justify-between gap-4">

        <div
          role="tablist"
          className="tabs tabs-box bg-[#151515]"
        >
          <button
            type="button"
            role="tab"
            onClick={() => setActiveTab("plan")}
            className={`tab ${
              activeTab === "plan"
                ? "tab-active"
                : ""
            }`}
          >
            Today's Plan
          </button>

          <button
            type="button"
            role="tab"
            onClick={() => setActiveTab("saved")}
            className={`tab ${
              activeTab === "saved"
                ? "tab-active"
                : ""
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="whitespace-nowrap text-sm font-medium text-gray-400">
            Sort By
          </span>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as SortOption
                )
              }
              className="select select-sm w-32 appearance-none border-white/10 bg-[#151515] pr-8 text-white outline-none focus:border-[#ccff00]"
            >
              <option value="duration">
                Duration
              </option>

              <option value="calories">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>
            </select>

            <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400" />
          </div>
        </div>
      </div>

      {activeTab === "plan" && (
        <div className="mt-8 w-full">
          {sortedPlanItems.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#111111] px-6 py-16 text-center">
              <h3 className="text-2xl font-bold text-white">
                NOTHING HERE YET
              </h3>

              <p className="mx-auto mt-3 max-w-md text-gray-400">
                Browse the library and add a lift to get today moving.
              </p>

              <Link
                href="/#library"
                className="btn mt-6 rounded-full bg-white px-6 text-black hover:bg-gray-200"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {sortedPlanItems.map((workout) => (
                <PlanCard
                  key={workout.id}
                  workout={workout}
                  onRemove={removeFromPlan}
                  onDone={markAsDone}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "saved" && (
        <div className="mt-8 w-full">
          {sortedSavedItems.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#111111] px-6 py-16 text-center">
              <h3 className="text-2xl font-bold text-white">
                NOTHING HERE YET
              </h3>

              <p className="mx-auto mt-3 max-w-md text-gray-400">
                Browse the library and save a workout for later.
              </p>

              <Link
                href="/#library"
                className="btn mt-6 rounded-full bg-white px-6 text-black hover:bg-gray-200"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {sortedSavedItems.map((workout) => (
                <PlanCard
                  key={workout.id}
                  workout={workout}
                  isSaved
                  onRemove={removeSavedWorkout}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlanTabs;