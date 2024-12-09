/* eslint-disable prettier/prettier */
import { FC, useState } from "react"
import { View, TextInput, TextStyle, ViewStyle } from "react-native"
import { Screen, Button, Text } from "../../components"
import { useAppTheme } from "@/utils/useAppTheme"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import type { ThemedStyle } from "@/theme"

export const DemoShowroomScreen: FC = () => {
  const { themed } = useAppTheme()
  const navigation = useNavigation()

  const [taskTitle, setTaskTitle] = useState("")
  const [taskDescription, setTaskDescription] = useState("")

  const handleAddTask = async () => {
    if (!taskTitle.trim() || !taskDescription.trim()) {
      console.log("Judul atau deskripsi kosong"); // Log jika input kosong
      alert("Judul dan deskripsi tugas tidak boleh kosong!");
      return;
    }
  
    try {
      console.log("Memulai proses menambahkan tugas...");
      const newTask = { id: Date.now().toString(), title: taskTitle, description: taskDescription };
      console.log("Tugas baru:", newTask);
  
      const storedTasks = await AsyncStorage.getItem("tasks");
      const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];
      console.log("Tugas tersimpan sebelumnya:", parsedTasks);
  
      const updatedTasks = [...parsedTasks, newTask];
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
      console.log("Tugas berhasil diperbarui:", updatedTasks);
  
      setTaskTitle("");
      setTaskDescription("");
      navigation.navigate("DemoCommunity"); // Navigasi ke layar daftar tugas
      console.log("Navigasi ke layar DemoCommunity");
    } catch (error) {
      console.error("Gagal menambahkan tugas:", error); // Log jika ada error
    }
  };

  return (
    <Screen preset="fixed">
      {/* Bagian Atas */}
      <View style={themed($topContainer)}>
        <Text style={themed($screenHeading)} preset="heading">
          Tambah Tugas Baru
        </Text>
        <Text style={themed($subHeading)} preset="subheading">
          Catat tugas penting Anda
        </Text>
      </View>

      {/* Bagian Bawah */}
      <View style={themed($bottomContainer)}>
        <View style={themed($inputContainer)}>
          <Text style={themed($label)}>Judul Tugas</Text>
          <TextInput
            style={themed($input)}
            placeholder="Masukkan judul tugas"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />

          <Text style={themed($label)}>Deskripsi Tugas</Text>
          <TextInput
            style={themed($multilineInput)}
            placeholder="Tambahkan detail tugas"
            value={taskDescription}
            onChangeText={setTaskDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        <Button
          text="Tambah Tugas"
          style={themed($addButton)}
          textStyle={themed($addButtonText)}
          onPress={handleAddTask}
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

const $addButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  position: "absolute",
  bottom: spacing.lg,
  left: spacing.lg,
  right: spacing.lg,
  backgroundColor: colors.palette.blueDark400,
  borderRadius: spacing.md,
  paddingVertical: spacing.sm,
})

const $addButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  textAlign: "center",
})