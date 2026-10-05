import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { focusRing, gutter, neutral, transition } from "@/lib/tokens";

const section: SxProps<Theme> = { px: gutter };
const heading: SxProps<Theme> = {
  fontSize: { xs: "1.5rem", md: "2rem" },
  fontWeight: 700,
  color: neutral[100],
};
const item: SxProps<Theme> = {
  bgcolor: neutral[900],
  borderRadius: 1,
  // the indicator is a plus that becomes a cross, so open and closed differ without an icon set
  "&[open] .indicator": { transform: "rotate(45deg)" },
};
const question: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  px: 3,
  py: 2.5,
  cursor: "pointer",
  fontSize: { xs: "1.0625rem", md: "1.25rem" },
  fontWeight: 500,
  color: neutral[100],
  transition,
  "&:hover": { bgcolor: neutral[800] },
  // the default disclosure triangle, in every engine that draws one
  listStyle: "none",
  "&::-webkit-details-marker": { display: "none" },
  ...focusRing,
};
const indicator: SxProps<Theme> = {
  ml: "auto",
  flexShrink: 0,
  fontSize: "1.75rem",
  lineHeight: 1,
  color: neutral[300],
  transition,
};
const answer: SxProps<Theme> = {
  px: 3,
  pb: 2.5,
  fontSize: { xs: "1rem", md: "1.125rem" },
  lineHeight: 1.6,
  color: neutral[300],
};

const questions = [
  {
    question: "What is webshow?",
    answer:
      "A film catalogue you browse the way you would a streaming service: rows by genre, a page for every title, cast and runtime and a trailer that plays full screen. The films are real and so are the trailers. It is a portfolio project rather than a subscription, so there is nothing to cancel.",
  },
  {
    question: "What does it cost?",
    answer: "Nothing. There is no payment step, no card and no trial that turns into a bill.",
  },
  {
    question: "What can I watch without an account?",
    answer:
      "The five titles on this page, in full. They are the five most popular in the catalogue, so the sample changes as the catalogue does.",
  },
  {
    question: "What does signing up add?",
    answer:
      "The other films, and a home page that reacts to you: where you stopped in anything you started, a Keep watching row, and a row of recommendations built from the last thing you finished.",
  },
  {
    question: "How do the recommendations work?",
    answer:
      "Every film's synopsis, cast and genres are turned into a vector by an embedding model, so titles end up near each other when they are about similar things rather than when they share a label. Suggestions are the nearest neighbours that also share at least one genre with what you watched.",
  },
];

// Native disclosure elements: open and closed is a browser concern, so this stays a server
// component and the page ships no JavaScript for it
export function JoinFaq() {
  return (
    <Stack component="section" spacing={2.5} sx={section}>
      <Typography component="h2" sx={heading}>
        Frequently asked questions
      </Typography>
      <Stack spacing={1}>
        {questions.map((entry) => (
          <Box component="details" key={entry.question} sx={item}>
            <Box component="summary" sx={question}>
              {entry.question}
              <Box component="span" className="indicator" aria-hidden="true" sx={indicator}>
                +
              </Box>
            </Box>
            <Typography sx={answer}>{entry.answer}</Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
