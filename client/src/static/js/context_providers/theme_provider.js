import { createTheme, ThemeProvider } from '@mui/material/styles';

let theme = createTheme({
    palette: {
        colorDark: "#4B164C",
        colorMiddle: "#DD88CF",
        colorLight: "#F8E7F6",
        colorWhite: "#F5F5F5",
        colorVeryDark: "#1E1E1E",
    },
});

export const MyThemeProvider = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      );
}