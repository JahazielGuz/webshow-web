import { Browse } from "@/components/Browse";
import { Landing } from "@/components/Landing";
import { getSession } from "@/lib/session";

// What the home URL renders, and what a movie URL renders behind its dialog: the catalogue for
// someone signed in, the pitch for a visitor. One component, so the two routes cannot drift and
// leave the catalogue showing behind a dialog a visitor was allowed to open.
export async function HomeSurface() {
  const user = await getSession();

  return user === null ? <Landing /> : <Browse />;
}
