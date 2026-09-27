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
  
  addToPlan: (workout: IWorkout) => void;
  removeFromPlan: (id: string) => void;
  markAsDone: (id: string) => void;

  
  saveWorkout: (workout: IWorkout) => void;
  removeSavedWorkout: (id: string) => void;
}

export const FitLogContext =
  createContext<FitLogContextType | null>(null);

export function FitLogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [planItems, setPlanItems] = useState<IWorkout[]>([]);
  const [savedItems, setSavedItems] = useState<IWorkout[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);


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

  
  const addToPlan = (workout: IWorkout) => {
    // Maximum 5 workouts
    if (planItems.length >= 5) {
      toast.error(
        "You can add maximum 5 workouts to today's plan."
      );

      return;
    }

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

  
  const removeFromPlan = (id: string) => {
    setPlanItems((prev) =>
      prev.filter(
        (workout) => workout.id !== id
      )
    );

    toast.warn(
      "Workout removed from today's plan."
    );
  };

  
  const markAsDone = (id: string) => {
    setPlanItems((prev) =>
      prev.filter(
        (workout) => workout.id !== id
      )
    );

    toast.success(
      "Workout marked as done!"
    );
  };

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

  
  const removeSavedWorkout = (id: string) => {
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
        // Data
        planItems,
        savedItems,

        // Counts
        planCount: planItems.length,
        savedCount: savedItems.length,

        // Plan actions
        addToPlan,
        removeFromPlan,
        markAsDone,

        // Saved actions
        saveWorkout,
        removeSavedWorkout,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

