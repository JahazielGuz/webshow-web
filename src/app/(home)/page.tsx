import { Browse } from "@/components/Browse";
import { Landing } from "@/components/Landing";
import { getSession } from "@/lib/session";

// Signed out the home page sells the catalogue; signed in it is the catalogue
export default async function HomePage() {
  const user = await getSession();

  return user === null ? <Landing /> : <Browse />;
}
