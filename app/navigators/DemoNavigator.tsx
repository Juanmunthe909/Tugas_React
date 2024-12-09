import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { TextStyle, ViewStyle, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { translate } from "../i18n"
import { DemoCommunityScreen, DemoShowroomScreen, DemoDebugScreen } from "../screens"
import { DemoPodcastListScreen } from "../screens/DemoPodcastListScreen"
import type { ThemedStyle } from "@/theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { useAppTheme } from "@/utils/useAppTheme"

export type DemoTabParamList = {
  DemoCommunity: undefined
  DemoShowroom: { queryIndex?: string; itemIndex?: string }
  DemoDebug: undefined
  DemoPodcastList: undefined
  DemoEditTask: { taskId: string }
}

export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>;

const TabNavigator = createBottomTabNavigator<DemoTabParamList>()

export function DemoNavigator() {
  const { bottom } = useSafeAreaInsets()
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  // Icon mapping to handle different icon names
  const getIconName = (icon: string, focused: boolean) => {
    const iconMap = {
      'plus': focused ? 'add-circle' : 'add-circle-outline',
      'list': focused ? 'list-circle' : 'list-circle-outline',
      'check': focused ? 'checkmark-circle' : 'checkmark-circle-outline',
      'logout': focused ? 'log-out' : 'log-out-outline',
      'components': focused ? 'cube' : 'cube-outline',
      'community': focused ? 'people' : 'people-outline',
      'podcast': focused ? 'headset' : 'headset-outline',
      'debug': focused ? 'bug' : 'bug-outline'
    }
    return iconMap[icon] || 'help-circle-outline'
  }

  return (
    <TabNavigator.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: themed([$tabBar, { height: bottom + 70 }]),
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: themed($tabBarLabel),
        tabBarItemStyle: themed($tabBarItem),
      }}
    >
      <TabNavigator.Screen
        name="DemoShowroom"
        component={DemoShowroomScreen}
        options={{
          tabBarLabel: translate("demoNavigator:addTaskTab"),
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name={getIconName('plus', focused)}
                color={focused ? colors.palette.blueDark400 : colors.palette.blueDark100}
                size={30}
              />
            </View>
          ),
        }}
      />

      <TabNavigator.Screen
        name="DemoCommunity"
        component={DemoCommunityScreen}
        options={{
          tabBarLabel: translate("demoNavigator:allTasksTab"),
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name={getIconName('list', focused)}
                color={focused ? colors.palette.blueDark400 : colors.palette.blueDark100}
                size={30}
              />
            </View>
          ),
        }}
      />

      <TabNavigator.Screen
        name="DemoPodcastList"
        component={DemoPodcastListScreen}
        options={{
          tabBarAccessibilityLabel: translate("demoNavigator:completedTasksTab"),
          tabBarLabel: translate("demoNavigator:completedTasksTab"),
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name={getIconName('check', focused)}
                color={focused ? colors.palette.blueDark400 : colors.palette.blueDark100}
                size={30}
              />
            </View>
          ),
        }}
      />

      <TabNavigator.Screen
        name="DemoDebug"
        component={DemoDebugScreen}
        options={{
          tabBarLabel: translate("demoNavigator:logoutTab"),
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name={getIconName('logout', focused)}
                color={focused ? colors.palette.blueDark400 : colors.palette.blueDark100}
                size={30}
              />
            </View>
          ),
        }}
      />
    </TabNavigator.Navigator>
  )
}

const $tabBar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
})

const $tabBarItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingTop: spacing.md,
})

const $tabBarLabel: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  color: colors.text,
})