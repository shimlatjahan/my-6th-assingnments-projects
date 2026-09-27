import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

import WorkoutDetailsActions from "@/components/workout/workoutDetailsActions";
import { IWorkout } from "@/types/type";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const API_URL =
  "https://api.api-store.workers.dev/api/fitlog";

const getWorkout = async (
  id: string
): Promise<IWorkout> => {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const workouts: IWorkout[] = await response.json();

  const workout = workouts.find(
    (item) => item.id === Number(id)
  );

  if (!workout) {
    notFound();
  }

  return workout;
};

const WorkoutDetailsPage = async ({
  params,
}: WorkoutDetailsPageProps) => {
  const { id } = await params;

  const workout = await getWorkout(id);

  return (
    <main className="min-h-screen bg-[#0b0d10] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Back to Library */}
        <Link
          href="/#library"
          className="mb-7 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <FaArrowLeft />
          Back to Library
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">

          {/* Image */}
          <div className="relative h-[360px] overflow-hidden rounded-xl sm:h-[480px] lg:h-[500px]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">

            {/* Name */}
            <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400">
              {workout.description}
            </p>

            {/* Muscle Groups */}
            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-lime-400 px-3 py-1 text-xs font-semibold text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Specs */}
            <div className="mt-5 overflow-hidden rounded-xl border border-zinc-800 bg-[#15181e]">

              <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Equipment
                </span>

                <span className="text-xs text-gray-200">
                  {workout.equipment}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Difficulty
                </span>

                <span className="text-xs text-gray-200">
                  {workout.difficulty}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Sets
                </span>

                <span className="text-xs text-gray-200">
                  {workout.sets}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Reps
                </span>

                <span className="text-xs text-gray-200">
                  {workout.reps}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Duration
                </span>

                <span className="text-xs text-gray-200">
                  {workout.duration} min
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Calories
                </span>

                <span className="text-xs text-gray-200">
                  {workout.caloriesBurned} kcal
                </span>
              </div>

              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Rating
                </span>

                <span className="text-xs text-gray-200">
                  {workout.rating}
                </span>
              </div>

            </div>

            {/* Instructions */}
            <div className="mt-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-white">
                Instructions
              </h2>

              <div className="mt-3 space-y-3">
                {workout.instructions.map(
                  (instruction, index) => (
                    <div
                      key={index}
                      className="flex gap-3"
                    >
                      <span className="text-xs text-gray-500">
                        {index + 1}.
                      </span>

                      <p className="text-xs leading-5 text-gray-400">
                        {instruction}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Buttons */}
            <WorkoutDetailsActions workout={workout} />

          </div>
        </div>
      </div>
    </main>
  );
};

export default WorkoutDetailsPage;