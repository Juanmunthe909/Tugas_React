import type { ThemedStyle } from "@/theme"
import { ViewStyle } from "react-native"

export const $logoutButtonPressed: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flex: 1,
  backgroundColor: colors.palette.angry200, // Slightly darker angry color
  borderRadius: spacing.md,
  paddingVertical: spacing.sm,
})
