import { useEffect, useEffectEvent, useRef, useState, type RefObject } from "react";
import { hideCaptions, loadYouTubeApi } from "@/lib/youtubeApi";

export type PlayerStatus = "loading" | "playing" | "paused" | "buffering" | "ended" | "error";

export type YouTubePlayerOptions = {
  videoId: string;
  autoplay: boolean;
  // Called once, when playback first begins
  onStart?: () => void;
};

const POLL_MS = 250;

// Drives one YouTube player mounted inside `hostRef` and mirrors its real state into React
export function useYouTubePlayer(
  hostRef: RefObject<HTMLDivElement | null>,
  { videoId, autoplay, onStart }: YouTubePlayerOptions,
) {
  const playerRef = useRef<YT.Player | null>(null);
  const [status, setStatus] = useState<PlayerStatus>("loading");
  const [started, setStarted] = useState(false);
  // Always the latest callback, without re-creating the player when it changes
  const handleStart = useEffectEvent(() => onStart?.());
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const host = hostRef.current;

    if (host === null) {
      return;
    }

    let cancelled = false;
    let started = false;
    // The API replaces this element with its iframe, so give it one of its own to consume
    const mount = document.createElement("div");
    host.append(mount);

    loadYouTubeApi().then((api) => {
      if (cancelled) {
        return;
      }

      const states: Partial<Record<YT.PlayerState, PlayerStatus>> = {
        [api.PlayerState.PLAYING]: "playing",
        [api.PlayerState.PAUSED]: "paused",
        [api.PlayerState.BUFFERING]: "buffering",
        [api.PlayerState.ENDED]: "ended",
        [api.PlayerState.CUED]: "paused",
      };

      playerRef.current = new api.Player(mount, {
        videoId,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          iv_load_policy: 3,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            hideCaptions(event.target);
            setDuration(event.target.getDuration());
            setMuted(event.target.isMuted());
          },
          onStateChange: (event) => {
            const next = states[event.data];

            if (next !== undefined) {
              setStatus(next);
            }

            if (event.data === api.PlayerState.PLAYING) {
              hideCaptions(event.target);
              setDuration(event.target.getDuration());

              if (!started) {
                started = true;
                setStarted(true);
                handleStart();
              }
            }
          },
          // A trailer that cannot be embedded or no longer exists
          onError: () => setStatus("error"),
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
      mount.remove();
    };
  }, [hostRef, videoId, autoplay]);

  // While playing, keep the clock in step with the player
  useEffect(() => {
    if (status !== "playing") {
      return;
    }

    const timer = window.setInterval(() => {
      const player = playerRef.current;

      if (player !== null) {
        setCurrentTime(player.getCurrentTime());
      }
    }, POLL_MS);

    return () => window.clearInterval(timer);
  }, [status]);

  function play() {
    playerRef.current?.playVideo();
  }

  function pause() {
    playerRef.current?.pauseVideo();
  }

  function seekTo(seconds: number) {
    const player = playerRef.current;

    if (player === null) {
      return;
    }

    const target = Math.min(Math.max(seconds, 0), duration);
    player.seekTo(target, true);
    setCurrentTime(target);
  }

  function seekBy(delta: number) {
    seekTo(currentTime + delta);
  }

  function toggleMute() {
    const player = playerRef.current;

    if (player === null) {
      return;
    }

    if (player.isMuted()) {
      player.unMute();
      setMuted(false);
    } else {
      player.mute();
      setMuted(true);
    }
  }

  return {
    status,
    started,
    currentTime,
    duration,
    muted,
    play,
    pause,
    seekTo,
    seekBy,
    toggleMute,
  };
}
