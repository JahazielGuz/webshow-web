import type { ReactNode } from "react";
import { formatRuntime } from "@/lib/format";

const scrim = "absolute inset-0 bg-linear-to-t from-neutral-900 via-neutral-900/40 to-transparent";
const treatment = "absolute inset-x-0 bottom-0 space-y-2 p-6";
const heading = "text-2xl font-bold text-white md:text-4xl";
const meta = "text-sm text-neutral-300";

export type TitleTreatmentProps = {
  title: string;
  releaseYear: number;
  runtime: number | null;
  children?: ReactNode;
};

export function TitleTreatment({ title, releaseYear, runtime, children }: TitleTreatmentProps) {
  const metaLine =
    runtime === null ? String(releaseYear) : `${releaseYear} · ${formatRuntime(runtime)}`;

  return (
    <>
      <div className={scrim} />
      <div className={treatment}>
        <h2 id="movie-title" className={heading}>
          {title}
        </h2>
        <p className={meta}>{metaLine}</p>
        {children}
      </div>
    </>
  );
}
