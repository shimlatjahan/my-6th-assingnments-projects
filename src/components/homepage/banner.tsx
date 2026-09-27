
import Image from "next/image";
import Link from "next/link";

import banner from "@/assests/banner.png";

const Hero = () => {
  return (
    <section className="bg-[#0b0b0b]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="grid items-center overflow-hidden rounded-2xl bg-[#151515] lg:grid-cols-2">

          
          <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">

            
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
              WORKOUT LIBRARY
            </p>

            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black uppercase leading-none tracking-tight text-white">
              <span className="inline-flex items-baseline whitespace-nowrap gap-1 sm:gap-2">
                TRAIN WITH INTENT
               
                <span className="inline-block h-[0.18em] w-[0.18em] bg-white self-end mb-[0.12em]" />
                LOG
              </span>
              <br />
              <span className="inline-flex items-baseline gap-1 sm:gap-2">
                EVERY SET
               
                <span className="inline-block h-[0.18em] w-[0.18em] bg-white self-end mb-[0.12em]" />
              </span>
            </h1>

            
            <p className="mt-6 max-w-xl text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
              FitLog is a dark, no-nonsense gym companion: pick a lift,
              lock it into today&apos;s plan, and watch the week&apos;s work
              add up.
            </p>

            <Link
              href="#library"
              className="mt-7 inline-block rounded-md bg-[#ccff00] px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-black transition-all duration-300 hover:bg-[#d8ff4d]"
            >
              BROWSE WORKOUTS
            </Link>
          </div>

          <div className="relative min-h-[300px] overflow-hidden sm:min-h-[380px] lg:min-h-[450px]">
            <Image
              src={banner}
              alt="FitLog workout banner"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;