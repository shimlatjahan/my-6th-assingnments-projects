"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaRegClock,
  FaFire,
  FaStar,
  FaCheck,
  FaXmark,
} from "react-icons/fa6";

import { IWorkout } from "@/types/type";

interface PlanCardProps {
  workout: IWorkout;
  isSaved?: boolean;
  onRemove?: (id: number) => void;
  onDone?: (id: number) => void;
}

const PlanCard = ({
  workout,
  isSaved = false,
  onRemove,
  onDone,
}: PlanCardProps) => {
  const duration = Number(workout.duration || 0);
  const calories = Number(workout.caloriesBurned || 0);
  const rating = Number(workout.rating || 0);

  return (
    <div className="group flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111111] md:min-h-[250px] md:flex-row">
     
      <div className="relative h-64 w-full shrink-0 overflow-hidden md:h-auto md:w-[38%]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          priority={false}
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 38vw"
        />
      </div>

      
      <div className="flex flex-1 flex-col justify-between p-6 md:flex-row md:items-center">
        {/* Workout Information */}
        <div className="flex-1">
          {/* Workout Name */}
          <h3 className="text-2xl font-bold text-white">
            {workout.name}
          </h3>

          
          <p className="mt-2 text-sm text-gray-400">
            {workout.equipment}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-300">
            <span className="flex items-center gap-2">
              <FaRegClock />
              <span>{duration} min</span>
            </span>

            <span className="flex items-center gap-2">
              <FaFire />
              <span>{calories} kcal</span>
            </span>

            <span className="flex items-center gap-2">
              <FaStar />
              <span>{rating}</span>
            </span>
          </div>
        </div>
        <div className="mt-8 flex shrink-0 flex-wrap items-center justify-end gap-3 md:mt-0 md:ml-8">
          <Link
            href={`/workout/${workout.id}`}
            className="btn btn-sm rounded-full border border-white/20 bg-transparent px-5 text-white hover:bg-white hover:text-black"
          >
            View Details
          </Link>
          {!isSaved && (
            <>
              <button
                type="button"
                onClick={() => onDone?.(workout.id)}
                className="btn btn-sm rounded-full bg-white px-5 text-black hover:bg-gray-200"
              >
                <FaCheck />
                Mark as Done
              </button>

              <button
                type="button"
                onClick={() => onRemove?.(workout.id)}
                className="btn btn-square btn-sm rounded-full border border-white/20 bg-transparent text-white hover:bg-white hover:text-black"
                aria-label={`Remove ${workout.name}`}
              >
                <FaXmark />
              </button>
            </>
          )}

          {isSaved && (
            <button
              type="button"
              onClick={() => onRemove?.(workout.id)}
              className="btn btn-sm rounded-full border border-white/20 bg-transparent px-5 text-white hover:bg-white hover:text-black"
            >
              <FaXmark />
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanCard;