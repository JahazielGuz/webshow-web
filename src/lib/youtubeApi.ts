// YouTube's IFrame Player API: one script, loaded once, shared by every player on the page

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
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
