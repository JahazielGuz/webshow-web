const main = "min-h-dvh bg-neutral-950 py-6";
const stack = "animate-pulse space-y-8";
const section = "space-y-3";
const heading = "mx-4 h-6 w-40 rounded bg-neutral-800 md:mx-6";
const strip = "flex gap-4 overflow-hidden px-4 md:px-6";
const tile = "w-32 shrink-0 sm:w-36 md:w-40";
const poster = "aspect-[2/3] rounded-lg bg-neutral-800";

const ROWS = 4;
const TILES = 8;

export default function Loading() {
  return (
    <main className={main}>
      <div className={stack}>
        {Array.from({ length: ROWS }).map((_, row) => (
          <section key={row} className={section}>
            <div className={heading} />
            <div className={strip}>
              {Array.from({ length: TILES }).map((_, tileIndex) => (
                <div key={tileIndex} className={tile}>
                  <div className={poster} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
