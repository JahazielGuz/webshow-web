import { createTheme } from "@mui/material/styles";
import { neutral } from "@/lib/tokens";

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: neutral[950], paper: neutral[900] },
    text: { primary: neutral[100], secondary: neutral[400] },
  },
  typography: {
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  shape: { borderRadius: 8 },
  components: {
    // Material's ripples and uppercase buttons are not part of this design
    MuiButtonBase: { defaultProps: { disableRipple: true } },
    MuiButton: { styleOverrides: { root: { textTransform: "none" } } },
  },
});
