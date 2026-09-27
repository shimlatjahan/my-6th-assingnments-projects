
import { IWorkout } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaClock,
  FaFire,
  FaStar,
} from "react-icons/fa6";

interface WorkoutCardProps {
  workout: IWorkout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:border-zinc-700"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-lime-400/10 px-3 py-1 text-xs font-medium text-lime-400"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold text-white">
          {workout.name}
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          {workout.equipment}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4 text-sm text-gray-400">
          <span className="flex items-center gap-1.5">
            <FaClock />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1.5">
            <FaFire />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1.5">
            <FaStar />
            {workout.rating}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-lime-400">
          View Details
          <FaArrowRight className="transition duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;