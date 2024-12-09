/* eslint-disable prettier/prettier */
import { FC, useState } from "react"
import { View, FlatList, TextStyle, ViewStyle } from "react-native"
import { Screen, Text } from "../components"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback } from "react"

// Type for completed tasks
interface CompletedTask {
  id: string;
  title: string;
  description: string;
  completedAt: string;
}

export const DemoPodcastListScreen: FC = () => {
  const { themed } = useAppTheme();
  const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>([]);

  const fetchCompletedTasks = async () => {
    try {
      const storedCompletedTasks = await AsyncStorage.getItem("completedTasks");
      const parsedTasks = storedCompletedTasks ? JSON.parse(storedCompletedTasks) : [];
      
      // Sort completed tasks with most recent first
      const sortedCompletedTasks = parsedTasks.sort((a, b) => 
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      );
      
      setCompletedTasks(sortedCompletedTasks);
    } catch (error) {
      console.error("Gagal mengambil tugas selesai:", error);
    }
  };

  // Use useFocusEffect to refresh tasks when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchCompletedTasks();
    }, [])
  );

  const renderCompletedTaskItem = ({ item }: { item: CompletedTask }) => (
    <View style={themed($taskItemContainer)}>
      <View style={themed($taskTextContainer)}>
        <Text style={themed($taskTitle)}>{item.title}</Text>
        <Text style={themed($taskDescription)} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <Screen preset="fixed">
      {/* Top Section */}
      <View style={themed($topContainer)}>
        <Text style={themed($screenHeading)} preset="heading">
          Tugas Selesai
        </Text>
        <Text style={themed($subHeading)} preset="subheading">
          Catat dan lihat progress Anda
        </Text>
      </View>

      {/* Bottom Section */}
      <View style={themed($bottomContainer)}>
        {completedTasks.length === 0 ? (
          <View style={themed($emptyStateContainer)}>
            <Text style={themed($emptyStateText)}>
              Belum ada tugas yang diselesaikan. Ayo mulai produktif!
            </Text>
          </View>
        ) : (
          <FlatList
            data={completedTasks}
            renderItem={renderCompletedTaskItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={themed($listContainer)}
          />
        )}
      </View>
    </Screen>
  );
};

/** Styling */
const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "30%",
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: spacing.lg,
});

const $bottomContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "70%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.md,
  position: "relative",
});

const $screenHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
  textAlign: "center",
});

const $subHeading: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  textAlign: "center",
});

const $listContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: 20, // Space at the bottom of the list
});

const $taskItemContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: colors.background,
  borderRadius: 10,
  padding: spacing.md,
  marginBottom: spacing.md,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
});

const $taskTextContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  marginRight: 10,
});

const $taskTitle: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: spacing.sm,
  color: colors.text,
});

const $taskDescription: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  fontSize: 14,
});

const $emptyStateContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: spacing.lg,
});

const $emptyStateText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  textAlign: "center",
  fontSize: 16,
});
