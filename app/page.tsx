import Image from "next/image";
// import CalendarButton from "../components/CalendarButton";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col  row-start-2 items-center justify-center text-center">
        <p className="text-3xl">You are invited to</p>
        <h1 className="text-8xl font-bold py-4">SHIKI FRIDAY</h1>
        <p className="text-3xl">WOOOOOOO!!!!!</p>
        <Image
          unoptimized
          className="mt-18 mb-24 animate-ping"
          src="/dancing.gif"
          alt="Next.js logo"
          width={300}
          height={300}
          priority
        />
        <p>Every Friday at noon o clock.</p>
        {/* <div className="animate-bounce mt-12">
          <CalendarButton />
        </div> */}
      </main>
    </div>
  );
}
