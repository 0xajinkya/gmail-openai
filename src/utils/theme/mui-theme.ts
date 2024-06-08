import { createTheme } from "@mui/material/styles";

/**
 * The custom theme for the application.
 */
export const theme = createTheme({
  /**
   * Defines the color palette for the theme.
   */
  palette: {
    /**
     * The primary color palette.
     */
    primary: {
      /**
       * The main primary color.
       */
      main: "#010120",
    },
    /**
     * The secondary color palette.
     */
    secondary: {
      /**
       * The main secondary color.
       */
      main: "#47854c",
    },
  },
  /**
   * Defines the typography settings for the theme.
   */
  typography: {
    /**
     * The default font family.
     */
    fontFamily: "Ubuntu",
    /**
     * The regular font weight.
     */
    fontWeightRegular: 500,
    /**
     * The bold font weight.
     */
    fontWeightBold: 700,
    /**
     * The light font weight.
     */
    fontWeightLight: 400,
    /**
     * The medium font weight.
     */
    fontWeightMedium: 600,
  },
});
