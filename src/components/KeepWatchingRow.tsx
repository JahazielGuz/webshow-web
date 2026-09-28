import { PosterTile } from "@/components/PosterTile";
import { TileRow } from "@/components/TileRow";
import { keepWatching } from "@/lib/watchProgress";

// Films the signed-in viewer started and did not finish, most recent first. Fetches its own
// data, and renders nothing at all when there is none: a signed-out visitor should not see an
// empty shelf, and neither should someone who has watched everything they started.
export async function KeepWatchingRow() {
  const items = await keepWatching();

  if (items.length === 0) {
    return null;
  }

  return (
    <TileRow title="Keep watching">
      {items.map((item, index) => (
        <PosterTile
          key={item.movie.id}
          movie={item.movie}
          priority={index < 3}
          progress={item.progress}
        />
      ))}
    </TileRow>
  );
}
