import React, { Suspense } from "react";

const LazyTextGenerateEffect = React.lazy(() =>
  import("../ui/text-generate-effect").then((mod) => ({ default: mod.TextGenerateEffect }))
);

const words = `Welcome to MOJARTO, your ultimate destination for exquisite art pieces. Explore a world of creativity, innovation, and inspiration. Find unique paintings, sculptures, and more crafted by talented artists from around the globe. Elevate your space with our curated collection and unlock the beauty of artistic expression.`;

export function HeroProducts() {
  return (
    <div className="py-20 px-10 md:px-20 text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold">
          Explore the World of Art
        </h1>
        <div className="mt-8">
          <Suspense fallback={<div>Loading...</div>}>
            <LazyTextGenerateEffect words={words} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
