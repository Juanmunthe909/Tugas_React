/* eslint-disable prettier/prettier */
import { FC, useState, useCallback } from "react"
import { View, FlatList, TextStyle, ViewStyle, TouchableOpacity } from "react-native"
import { Screen, Text } from "../components"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { useAppTheme } from "@/utils/useAppTheme"
import { useFocusEffect } from "@react-navigation/native"
import type { ThemedStyle } from "@/theme"

// Tipe data untuk tugas
interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const DemoCommunityScreen: FC<DemoTabScreenProps<"DemoCommunity">> = function DemoCommunityScreen(_props) {
  const { themed } = useAppTheme()
  const [tasks, setTasks] = useState<Task[]>([])

  const fetchTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks")
      const parsedTasks = storedTasks ? JSON.parse(storedTasks) : []
      
      // Urutkan tugas dengan yang terbaru di bagian atas
      const sortedTasks = parsedTasks.sort((a, b) => {
        return parseInt(b.id) - parseInt(a.id)
      })
      
      setTasks(sortedTasks)
      console.log("Tugas yang diambil:", sortedTasks)
    } catch (error) {
      console.error("Gagal mengambil tugas dari AsyncStorage:", error)
    }
  }

  // Ambil data saat layar dimuat
  useFocusEffect(
    useCallback(() => {
      fetchTasks()
    }, [])
  )

  const handleEditTask = (id: string) => {
    _props.navigation.navigate("DemoEditTask", { taskId: id }) // Navigasi ke layar edit
  }
  
  const handleDeleteTask = async (id: string) => {
    try {
      const updatedTasks = tasks.filter((task) => task.id !== id)
      setTasks(updatedTasks)
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks))
      console.log(`Deleted task with id: ${id}`)
    } catch (error) {
      console.error("Gagal menghapus tugas:", error)
    }
  }

  const handleToggleTaskCompletion = async (id: string) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === id 
          ? { ...task, completed: !task.completed, completedAt: new Date().toLocaleString() } 
          : task
      );
      setTasks(updatedTasks);
  
      // Simpan semua tugas ke AsyncStorage
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  
      // Simpan hanya tugas yang selesai ke "completedTasks"
      const completedTasks = updatedTasks
        .filter((task) => task.completed)
        .map(task => ({
          id: task.id,
          title: task.title,
          description: task.description,
          completedAt: new Date().toLocaleString()
        }));
      
      await AsyncStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  
      console.log(`Toggled completion for task with id: ${id}`);
    } catch (error) {
      console.error("Gagal mengubah status tugas:", error);
    }
  };

  const renderTaskItem = ({ item }: { item: Task }) => (
    <View style={themed($taskItemContainer)}>
      <TouchableOpacity 
        onPress={() => handleToggleTaskCompletion(item.id)}
        style={themed($completionIconContainer)}
      >
        <Text style={themed($completionToggleText)}>
          {item.completed ? '✓' : '○'}
        </Text>
      </TouchableOpacity>
      
      <View style={themed($taskTextContainer)}>
        <Text 
          style={[
            themed($taskTitle), 
            item.completed && themed($completedTaskText)
          ]}
        >
          {item.title}
        </Text>
        <Text 
          style={[
            themed($taskDescription), 
            item.completed && themed($completedTaskText)
          ]} 
          numberOfLines={2}
        >
          {item.description}
        </Text>
      </View>
      
      <View style={themed($buttonGroup)}>
        <TouchableOpacity 
          style={themed($iconButton)} 
          onPress={() => handleEditTask(item.id)}
        >
          <Text style={themed($editButtonText)}>✎</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={themed($iconButton)} 
          onPress={() => handleDeleteTask(item.id)}
        >
          <Text style={themed($deleteButtonText)}>✖</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <Screen preset="fixed">
      {/* Bagian Atas */}
      <View style={themed($topContainer)}>
        <Text style={themed($screenHeading)} preset="heading">
          Daftar Tugas
        </Text>
        <Text style={themed($subHeading)} preset="subheading">
          Kelola dan pantau tugas Anda
        </Text>
      </View>
  
      {/* Bagian Bawah */}
      <View style={themed($bottomContainer)}>
        {tasks.length === 0 ? (
          <View style={themed($emptyStateContainer)}>
            <Text style={themed($emptyStateText)}>
              Belum ada tugas. Ayo mulai produktif!
            </Text>
          </View>
        ) : (
          <FlatList
            data={tasks}
            renderItem={renderTaskItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={themed($listContainer)}
          />
        )}
      </View>
  
      {/* Tombol Tambah Tugas di luar kontainer */}
      <View style={themed($addButtonContainer)}>
        <TouchableOpacity
          style={themed($addButton)}
          onPress={() => _props.navigation.navigate("DemoShowroom")}
        >
          <Text style={themed($addButtonText)}>Tambah Tugas</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
}

/** Styling */
const $completionIconContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginRight: spacing.sm,
  justifyContent: 'center',
  alignItems: 'center',
})

const $iconButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginLeft: spacing.sm,
  justifyContent: 'center',
  alignItems: 'center',
})

const $completionToggleText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 30,
  color: colors.textDim,
})

const $editButtonText: ThemedStyle<TextStyle> = () => ({
  fontSize: 26,
  color: 'blue',
})

const $deleteButtonText: ThemedStyle<TextStyle> = () => ({
  fontSize: 26,
  color: 'red',
})

const $completedTaskText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  textDecorationLine: 'line-through',
})

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
  position: "relative",
})

const $screenHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
  textAlign: "center",
})

const $subHeading: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  textAlign: "center",
})

const $listContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.lg * 2,
})

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
})

const $taskTextContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  marginRight: 10,
})

const $taskTitle: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: spacing.sm,
  color: colors.text,
})

const $taskDescription: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  fontSize: 14,
})

const $buttonGroup: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
})

const $addButtonContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  position: 'absolute',
  bottom: -spacing.lg,
  left: 0,
  right: 0,
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.md,
  backgroundColor: colors.palette.neutral100,
  zIndex: 10,
})

const $addButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.blueDark400,
  borderRadius: spacing.md,
  paddingVertical: spacing.sm,
  alignItems: 'center',
})

const $addButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  textAlign: "center",
})

const $emptyStateContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: spacing.lg,
})

const $emptyStateText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  textAlign: "center",
  fontSize: 16,
})