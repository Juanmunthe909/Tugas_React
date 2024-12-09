/* eslint-disable prettier/prettier */
import { FC, useState, useEffect } from "react"
import { View, TextInput, TextStyle, ViewStyle } from "react-native"
import { Screen, Button, Text } from "../../components"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"

export const DemoEditTaskScreen: FC<DemoTabScreenProps<"DemoEditTask">> = function DemoEditTaskScreen({ route, navigation }) {
  const { themed } = useAppTheme()
  const { taskId } = route.params
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks")
        const tasks = storedTasks ? JSON.parse(storedTasks) : []
        const task = tasks.find((t: { id: string }) => t.id === taskId)
        if (task) {
          setTitle(task.title)
          setDescription(task.description)
        }
      } catch (error) {
        console.error("Gagal mengambil tugas:", error)
      }
    }
    fetchTask()
  }, [taskId])

  const handleSave = async () => {
    try {
      if (!title.trim() || !description.trim()) {
        alert("Judul dan deskripsi tugas tidak boleh kosong!")
        return
      }

      const storedTasks = await AsyncStorage.getItem("tasks")
      const tasks = storedTasks ? JSON.parse(storedTasks) : []
      const updatedTasks = tasks.map((t: { id: string }) =>
        t.id === taskId ? { ...t, title: title.trim(), description: description.trim() } : t
      )
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks))
      navigation.goBack()
    } catch (error) {
      console.error("Gagal menyimpan tugas:", error)
    }
  }

  return (
    <Screen preset="fixed">
      {/* Bagian Atas */}
      <View style={themed($topContainer)}>
        <Text style={themed($screenHeading)} preset="heading">
          Edit Tugas
        </Text>
        <Text style={themed($subHeading)} preset="subheading">
          Perbarui detail tugas Anda
        </Text>
      </View>

      {/* Bagian Bawah */}
      <View style={themed($bottomContainer)}>
        <View style={themed($inputContainer)}>
          <Text style={themed($label)}>Judul Tugas</Text>
          <TextInput
            style={themed($input)}
            placeholder="Masukkan judul tugas"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={themed($label)}>Deskripsi Tugas</Text>
          <TextInput
            style={themed($multilineInput)}
            placeholder="Tambahkan detail tugas"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        <Button
          text="Simpan Perubahan"
          style={themed($saveButton)}
          textStyle={themed($saveButtonText)}
          onPress={handleSave}
        />
      </View>
    </Screen>
  )
}

/** Styling */
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
  position: "relative",
  paddingTop: spacing.md,
})

const $screenHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
  textAlign: "center",
})

const $subHeading: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  textAlign: "center",
})

const $inputContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  paddingHorizontal: spacing.sm,
})

const $input: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: 50,
  borderColor: colors.border,
  borderWidth: 1,
  borderRadius: 8,
  paddingHorizontal: spacing.sm,
  marginBottom: spacing.md,
  backgroundColor: colors.background,
})

const $multilineInput: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  minHeight: 100,
  borderColor: colors.border,
  borderWidth: 1,
  borderRadius: 8,
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.sm,
  marginBottom: spacing.md,
  backgroundColor: colors.background,
  textAlignVertical: "top",
})

const $label: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  marginBottom: spacing.sm,
  color: colors.text,
  fontWeight: "bold",
})

const $saveButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  position: "absolute",
  bottom: spacing.lg,
  left: spacing.lg,
  right: spacing.lg,
  backgroundColor: colors.palette.blueDark400,
  borderRadius: spacing.md,
  paddingVertical: spacing.sm,
})

const $saveButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  textAlign: "center",
})