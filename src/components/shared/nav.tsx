"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";

import {
  FaClipboardList,
  FaBookmark,
  FaBars,
  FaXmark,
} from "react-icons/fa6";

import { FitLogContext } from "@/context/FitLogContext";
import logo from "@/assests/logo.png";

const Navbar = () => {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const context = useContext(FitLogContext);

  const planCount = context?.planCount ?? 0;
  const savedCount = context?.savedCount ?? 0;

  const isWorkoutActive = pathname === "/";
  const isPlanActive = pathname === "/my-plan";

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0b]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <Image
            src={logo}
            alt="FitLog Logo"
            width={42}
            height={42}
            priority
            className="h-10 w-auto object-contain"
          />

          <h1 className="text-xl font-black tracking-tight text-white sm:text-2xl">
            FIT<span className="text-[#ccff00]">LOG</span>
          </h1>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <Link
            href="/"
            className={`rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition ${
              isWorkoutActive
                ? "bg-[#ccff00] text-black"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition ${
              isPlanActive
                ? "bg-[#ccff00] text-black"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

  
        <div className="hidden items-center gap-2 sm:flex">
          {/* Plan */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full bg-[#ccff00] px-4 py-2 text-sm font-black text-black transition hover:scale-105"
          >
            <FaClipboardList />

            <span>Plan</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-xs text-[#ccff00]">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full border border-[#ccff00] px-4 py-2 text-sm font-black text-[#ccff00] transition hover:bg-[#ccff00] hover:text-black"
          >
            <FaBookmark />

            <span>Saved</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1 text-xs text-black">
              {savedCount}
            </span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white transition hover:border-[#ccff00] hover:text-[#ccff00] md:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <FaXmark className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#0b0b0b] px-4 py-4 md:hidden">
          
          <nav className="flex flex-col gap-2">
  
            <Link
              href="/"
              onClick={closeMenu}
              className={`flex items-center rounded-xl px-4 py-3 text-sm font-bold uppercase transition ${
                isWorkoutActive
                  ? "bg-[#ccff00] text-black"
                  : "text-gray-300 hover:bg-white/5"
              }`}
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              onClick={closeMenu}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase transition ${
                isPlanActive
                  ? "bg-[#ccff00] text-black"
                  : "text-gray-300 hover:bg-white/5"
              }`}
            >
              <span>My Plan</span>

              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  isPlanActive
                    ? "bg-black text-[#ccff00]"
                    : "bg-[#ccff00] text-black"
                }`}
              >
                {planCount}
              </span>
            </Link>
          </nav>

          
          <div className="mt-4 grid grid-cols-2 gap-2">
            
            <Link
              href="/my-plan"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#ccff00] py-3 text-sm font-black text-black transition hover:scale-[1.02]"
            >
              <FaClipboardList />

              <span>Plan</span>

              <span>({planCount})</span>
            </Link>

            <Link
              href="/my-plan"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#ccff00] py-3 text-sm font-black text-[#ccff00] transition hover:bg-[#ccff00] hover:text-black"
            >
              <FaBookmark />

              <span>Saved</span>

              <span>({savedCount})</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;