import { HomeSurface } from "@/components/HomeSurface";
import { SearchResults } from "@/components/SearchResults";
import { getSession } from "@/lib/session";

export type HomePageProps = {
  searchParams: Promise<{ q?: string }>;
};

// A query in the URL turns the home page into its results. Visitors never get there: the search
// box is theirs only once they have an account, and a typed URL must not be a way around that.
export default async function HomePage({ searchParams }: HomePageProps) {
  const [{ q }, user] = await Promise.all([searchParams, getSession()]);
  const query = q?.trim() ?? "";

  if (query === "" || user === null) {
    return <HomeSurface />;
  }

  return <SearchResults query={query} />;
}
