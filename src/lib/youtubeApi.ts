// YouTube's IFrame Player API: one script, loaded once, shared by every player on the page

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }

  // Augmenting @types/youtube's global namespace is the only way to add a method to YT.Player
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace YT {
    // Present on the real player but missing from @types/youtube
    interface Player {
      setOption(module: string, option: string, value: unknown): void;
    }
  }
}

const API_SRC = "https://www.youtube.com/iframe_api";

let ready: Promise<typeof YT> | null = null;

export function loadYouTubeApi(): Promise<typeof YT> {
  if (ready === null) {
    ready = new Promise((resolve) => {
      if (window.YT?.Player) {
        resolve(window.YT);
        return;
      }

      // The script calls this global when it has finished loading
      window.onYouTubeIframeAPIReady = () => resolve(window.YT);

      const script = document.createElement("script");
      script.src = API_SRC;
      document.head.append(script);
    });
  }

  return ready;
}

// YouTube turns captions on by itself for some videos, whatever cc_load_policy says; clearing
// the caption track is the one setting that sticks. Call it once the player is ready and again
// when playback starts, when the module is certainly loaded.
export function hideCaptions(player: YT.Player) {
  player.setOption("captions", "track", {});
}
