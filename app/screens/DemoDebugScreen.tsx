/* eslint-disable prettier/prettier */
import { FC } from "react"
import { View, TextStyle, ViewStyle } from "react-native"
import { Screen, Text, Button } from "../components"
import { useStores } from "../models"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"

export const DemoDebugScreen: FC = function DemoDebugScreen() {
  const { themed } = useAppTheme()
  const {
    authenticationStore: { logout },
  } = useStores()

  return (
    <Screen preset="fixed">
      {/* Top Section */}
      <View style={themed($topContainer)}>
        <Text style={themed($screenHeading)} preset="heading">
          Keluar Akun
        </Text>
        <Text style={themed($subHeading)} preset="subheading">
          Konfirmasi untuk keluar aplikasi
        </Text>
      </View>

      {/* Bottom Section */}
      <View style={themed($bottomContainer)}>
        <View style={themed($logoutContainer)}>
          <Text style={themed($logoutText)}>
            Anda akan keluar dari Todo Manager. Pastikan semua tugas Anda telah tersimpan dengan baik sebelum logout.
          </Text>
          
          <View style={themed($buttonGroup)}>
            <Button
              text="Keluar"
              style={themed($logoutButton)}
              textStyle={themed($logoutButtonText)}
              pressedStyle={themed($logoutButtonPressed)}
              onPress={logout}
            />
          </View>
        </View>
      </View>
    </Screen>
  )
}

/** Styling remains the same as in the original file */
const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "30%",
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: spacing.lg,
})

const $bottomContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "70%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.md,
  justifyContent: "center",
  alignItems: "center",
})

const $screenHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
  textAlign: "center",
})

const $subHeading: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  textAlign: "center",
})

const $logoutContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  alignItems: "center",
  paddingHorizontal: spacing.lg,
})

const $logoutText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  textAlign: "center",
  fontSize: 16,
  marginBottom: spacing.lg,
  color: colors.text,
})

const $buttonGroup: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
})

const $logoutButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flex: 1,
  backgroundColor: colors.palette.angry500,
  borderRadius: spacing.md,
  paddingVertical: spacing.sm,
})

const $logoutButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  textAlign: "center",
})

const $logoutButtonPressed: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flex: 1,
  backgroundColor: colors.palette.angry200, // Slightly darker angry color
  borderRadius: spacing.md,
  paddingVertical: spacing.sm,
})