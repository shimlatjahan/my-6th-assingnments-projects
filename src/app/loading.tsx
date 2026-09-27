import { FaDumbbell } from "react-icons/fa6";

const Loading = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0b0b] px-4">
      <div className="flex flex-col items-center justify-center text-center">
        {/* Spinner */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]" />

          <FaDumbbell className="text-2xl text-[#ccff00]" />
        </div>

        {/* Text */}
        <h2 className="mt-6 text-lg font-bold uppercase tracking-[0.15em] text-white">
          Loading workouts…
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Getting your workout library ready.
        </p>
      </div>
    </main>
  );
};

export default Loading;