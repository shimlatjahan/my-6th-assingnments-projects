import { FaDumbbell } from "react-icons/fa6";

const Loading = () => {
  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-center py-32">
        <div className="flex flex-col items-center text-center">
          <div className="relative flex h-16 w-16 items-center justify-center">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]" />

            <FaDumbbell className="text-xl text-[#ccff00]" />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-white">
            Loading workouts…
          </p>
        </div>
      </div>
    </main>
  );
};

export default Loading;