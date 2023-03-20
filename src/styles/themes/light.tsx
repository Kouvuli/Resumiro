import { createTheme } from '@mui/material/styles'

const whiteTheme = createTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff'
    },
    primary: {
      light: '#F4F8FF',
      main: '#1B3764',
      dark: '#0B1F3E',
      contrastText: '#fff'
    },
    secondary: {
      light: '#FFD976',
      main: '#FFCA42',
      dark: '#FAB914',
      contrastText: '#1B3764'
    },
    // Provide every color token (light, main, dark, and contrastText) when using
    // custom colors for props in Material UI's components.
    // Then you will be able to use it like this: `<Button color="custom">`
    // (For TypeScript, you need to add module augmentation for the `custom` value)
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    text: {
      primary: 'rgba(0,0,0,0.87)',
      secondary: 'rgba(0,0,0,0.6)',
      disabled: 'rgba(0,0,0,0.38)'
    },
    divider: 'rgba(0, 0, 0, 0.15)',
    background: {
      paper: '#fff',
      default: '#fff'
    }
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontSize: '3.75rem',
      fontWeight: 700,
      lineHeight: 1.2
    },
    h2: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.2
    },
    h4: {
      fontSize: '1.6rem',
      fontWeight: 700,
      lineHeight: 1.2
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 700,
      lineHeight: 1.2
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1.2
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.2
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.2
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.2
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.2
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 700,
      lineHeight: 1.2
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.2
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.2
    }
  }
})

export default whiteTheme
