import Image from "next/image";
import Link from "next/link";
import { FaRegCopyright } from "react-icons/fa6";

import logo from "@/assests/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#080808] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg">
            <Image
              src={logo}
              alt="FitLog Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>

          <span className="text-xl font-black tracking-widest">
            FITLOG
          </span>
        </Link>

        <p className="flex items-center gap-1 text-sm text-gray-500">
          <FaRegCopyright className="text-xs" />
          <span>
            2026 FitLog — Workout Library. Train hard,
            log honest.
          </span>
        </p>

      </div>
    </footer>
  );
};

export default Footer;