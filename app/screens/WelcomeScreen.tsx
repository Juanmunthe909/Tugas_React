import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Text, Screen } from "@/components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import type { ThemedStyle } from "@/theme"
import { useHeader } from "../utils/useHeader"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "@/utils/useAppTheme"

const welcomeLogo = require("../../assets/images/todo-logo.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const { themed } = useAppTheme()
  const { navigation } = _props
  const {
    authenticationStore: { logout },
  } = useStores()

  function goNext() {
    navigation.navigate("Demo", { screen: "DemoShowroom", params: {} })
  }

  useHeader(
    {
      rightTx: "common:logOut",
      onRightPress: logout,
    },
    [logout],
  )

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen preset="fixed">
      {/* Bagian Atas */}
      <View style={themed($topContainer)}>
        <Image style={themed($welcomeLogo)} source={welcomeLogo} resizeMode="contain" />
        <Text
          testID="welcome-heading"
          style={themed($welcomeHeading)}
          tx="welcomeScreen:readyForLaunch"
          preset="heading"
        />
        <Text tx="welcomeScreen:exciting" preset="subheading" />
      </View>

      {/* Bagian Bawah */}
      <View style={themed([$bottomContainer, $bottomContainerInsets])}>
        <Text tx="welcomeScreen:postscript" size="md" style={themed($tagline)} />
        <Button
          testID="next-screen-button"
          tx="welcomeScreen:letsGo"
          style={themed($tapButton)} // Gaya tombol seperti di LoginScreen
          textStyle={themed($tapButtonText)} // Gaya teks tombol
          onPress={goNext}
        />
      </View>
    </Screen>
  )
})

/** Styling */
const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: spacing.lg,
})

const $bottomContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
  alignItems: "center",
})

const $welcomeLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
})

const $welcomeHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $tagline: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  textAlign: "center",
  marginBottom: spacing.sm,
})

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.xs,
  backgroundColor: colors.palette.blueDark400, // Warna biru gelap
  borderRadius: spacing.md,
  paddingVertical: spacing.sm, // Padding vertikal
  paddingHorizontal: spacing.lg, // Padding horizontal
})

const $tapButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
})
