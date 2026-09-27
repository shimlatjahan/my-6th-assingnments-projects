
"use client";

import {
  createContext,
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import { IWorkout } from "@/types/type";

interface FitLogContextType {
  planItems: IWorkout[];
  savedItems: IWorkout[];

  // Counts
  planCount: number;
  savedCount: number;

  // Plan actions
  addToPlan: (workout: IWorkout) => void;
  removeFromPlan: (id: number) => void;
  markAsDone: (id: number) => void;

  // Saved actions
  saveWorkout: (workout: IWorkout) => void;
  removeSavedWorkout: (id: number) => void;
}

export const FitLogContext =
  createContext<FitLogContextType | null>(null);

export function FitLogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [planItems, setPlanItems] =
    useState<IWorkout[]>([]);

  const [savedItems, setSavedItems] =
    useState<IWorkout[]>([]);

  const [isLoaded, setIsLoaded] =
    useState(false);

  // Load data from localStorage
  useEffect(() => {
    try {
      const storedPlan =
        localStorage.getItem("fitlog-plan");

      const storedSaved =
        localStorage.getItem("fitlog-saved");

      if (storedPlan) {
        setPlanItems(JSON.parse(storedPlan));
      }

      if (storedSaved) {
        setSavedItems(JSON.parse(storedSaved));
      }
    } catch (error) {
      console.error(
        "Failed to load FitLog data:",
        error
      );
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    try {
      localStorage.setItem(
        "fitlog-plan",
        JSON.stringify(planItems)
      );

      localStorage.setItem(
        "fitlog-saved",
        JSON.stringify(savedItems)
      );
    } catch (error) {
      console.error(
        "Failed to save FitLog data:",
        error
      );
    }
  }, [planItems, savedItems, isLoaded]);

  // Add workout to Today's Plan
  const addToPlan = (workout: IWorkout) => {
    // Maximum 5 workouts
    if (planItems.length >= 5) {
      toast.error(
        "You can add maximum 5 workouts to today's plan."
      );

      return;
    }

    // Prevent duplicate workout
    const alreadyExists = planItems.some(
      (item) => item.id === workout.id
    );

    if (alreadyExists) {
      toast.error(
        "This workout is already in today's plan."
      );

      return;
    }

    setPlanItems((prev) => [
      ...prev,
      workout,
    ]);

    toast.success(
      "Workout added to today's plan!"
    );
  };

  // Remove workout from Today's Plan
  const removeFromPlan = (id: number) => {
    setPlanItems((prev) =>
      prev.filter(
        (workout) => workout.id !== id
      )
    );

    toast.warn(
      "Workout removed from today's plan."
    );
  };

  // Mark workout as Done
  const markAsDone = (id: number) => {
    setPlanItems((prev) =>
      prev.filter(
        (workout) => workout.id !== id
      )
    );

    toast.success(
      "Workout marked as done!"
    );
  };

  // Save workout for later
  const saveWorkout = (workout: IWorkout) => {
    // Prevent duplicate saved workout
    const alreadySaved = savedItems.some(
      (item) => item.id === workout.id
    );

    if (alreadySaved) {
      toast.error(
        "This workout is already saved."
      );

      return;
    }

    setSavedItems((prev) => [
      ...prev,
      workout,
    ]);

    toast.success(
      "Workout saved for later!"
    );
  };

  // Remove workout from Saved
  const removeSavedWorkout = (id: number) => {
    setSavedItems((prev) =>
      prev.filter(
        (workout) => workout.id !== id
      )
    );

    toast.warn(
      "Workout removed from saved."
    );
  };

  return (
    <FitLogContext.Provider
      value={{
        
        planItems,
        savedItems,

        
        planCount: planItems.length,
        savedCount: savedItems.length,

        
        addToPlan,
        removeFromPlan,
        markAsDone,

        saveWorkout,
        removeSavedWorkout,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

