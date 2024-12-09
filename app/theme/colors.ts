const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  primary100: "#F4E0D9",
  primary200: "#E8C1B4",
  primary300: "#DDA28E",
  primary400: "#D28468",
  primary500: "#C76542",
  primary600: "#A54F31",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry200: "#F1A3A1",
  angry300: "#E76F65",
  angry400: "#D84D39",
  angry500: "#C03403",
  angry600: "#9F2301",
  angry700: "#7F1A01",
  angry800: "#5E1201",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",

  // Warna biru gelap yang ditambahkan
  blueDark500: "#003366", // Warna biru gelap utama
  blueDark400: "#004080",
  blueDark300: "#00509E",
  blueDark200: "#336699",
  blueDark100: "#6699CC",

  // Warna hijau yang ditambahkan
  green100: "#E0F7E4", // Hijau muda
  green200: "#B3F2B2", // Hijau cerah
  green300: "#66E066", // Hijau segar
  green400: "#33CC33", // Hijau terang
  green500: "#009900", // Hijau tua
  green600: "#006600", // Hijau lebih gelap
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral200,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * The inactive tinting color.
   */
  tintInactive: palette.neutral300,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   */
  errorBackground: palette.angry100,
  // Tambahkan referensi ke warna biru gelap
  blueDark: palette.blueDark500,
} as const
