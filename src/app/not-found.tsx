import Link from "next/link";
import { FaArrowLeft, FaDumbbell } from "react-icons/fa6";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0b0b] px-4">
      <div className="w-full max-w-2xl text-center">
        
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-[#151515]">
          <FaDumbbell className="text-3xl text-[#ccff00]" />
        </div>

       
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ccff00]">
          Page Not Found
        </p>

        <h1 className="mt-3 text-7xl font-black tracking-tight text-white sm:text-8xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold uppercase text-white sm:text-3xl">
          Nothing Here Yet
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6
         text-gray-400 sm:text-base">
          The workout or page you are looking for does not exist.
          Let&apos;s get you back to the FitLog workout library.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-[#b8e600]"
        >
          <FaArrowLeft />
          Back to Workouts
        </Link>
      </div>
    </main>
  );
};

export default NotFound;