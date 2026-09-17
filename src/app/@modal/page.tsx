// The browse page has no overlay. Without this match the slot would keep showing whatever it
// last matched: a client-side navigation only changes a slot when the new URL matches inside it.
export default function NoOverlay() {
  return null;
}
