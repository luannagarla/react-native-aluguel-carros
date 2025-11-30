import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Layout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerTitle: () => (
          <Text style={styles.title}>Aluguel de Carros - Lua Car</Text>
        ),
        headerLeft: () => (
          <TouchableOpacity style={styles.backButton} onPress={() => router.push("/dashboard")}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
            <Text style={styles.backText}>Menu</Text>
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: "#1A73E8",
        },
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginLeft: 8,
  },
  backText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
