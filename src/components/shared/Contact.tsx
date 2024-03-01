import { BackgroundBeams } from "../ui/background-beams";

export function Contact() {
  return (
    <div className="h-screen w-full rounded-md relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Join the MOJARTO waitlist
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to MOJARTO, the ultimate destination for art lovers and
          collectors. Discover a curated selection of breathtaking artworks from
          talented artists around the world. From paintings to sculptures, our
          platform offers a diverse range of pieces to suit every taste and
          style. Join our waitlist today and be the first to explore the
          captivating world of MOJARTO.
        </p>
        <label htmlFor="email" className="sr-only">Email Address</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700 text-lg p-3"
        />
      </div>
      <BackgroundBeams />
    </div>
  );
}
