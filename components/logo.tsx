import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-0.5 shrink-0 select-none">
      <span className="text-lg font-black tracking-tight  leading-none ">
        CLOSET
        <span className="relative inline-block text-[#7C5CFC]">
          DROP
          <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-[#7C5CFC] rounded-full" />
        </span>
      </span>
      <span className="text-[#7C5CFC] text-lg md:text-xl -translate-y-2">
        ✦
      </span>
    </Link>
  );
};

export default Logo;
