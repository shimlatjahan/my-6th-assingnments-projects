import { IWorkout } from "@/types/type";
import WorkoutCard from "./workoutCard";

const API_URL =
  "https://api.api-store.workers.dev/api/fitlog";

const WorkoutLibrary = async () => {
  let workouts: IWorkout[] = [];

  try {
    const response = await fetch(API_URL, {
      next: {
        revalidate: 3600,
      },
    });

    if (response.ok) {
      const data = await response.json();

      if (Array.isArray(data)) {
        workouts = data;
      } else if (Array.isArray(data.data)) {
        workouts = data.data;
      }
    }
  } catch {
    
  }

  return (
    <section
      id="library"
      className="bg-black px-6 py-16 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold tracking-[0.25em] text-lime-400">
            WORKOUT LIBRARY
          </p>

          <h2 className="text-4xl font-bold text-white">
            THE LIBRARY
          </h2>

          <p className="mt-2 text-gray-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {workouts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#111111] px-6 py-16 text-center">
            <h3 className="text-2xl font-bold text-white">
              WORKOUTS TEMPORARILY UNAVAILABLE
            </h3>

            <p className="mx-auto mt-3 max-w-lg text-gray-400">
              The workout service is temporarily unavailable.
              Please try again later.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkoutLibrary;