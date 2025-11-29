import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área do funcionário</Text>
      <Text style={styles.subtitle}>Selecione uma área do sistema</Text>

      <View style={styles.grid}>

        <TouchableOpacity style={styles.card} onPress={() => router.push("/carro")}>
          <Text style={styles.cardText}>Carros</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push("/cliente")}>
          <Text style={styles.cardText}>Clientes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push("/funcionario")}>
          <Text style={styles.cardText}>Funcionários</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push("/venda")}>
          <Text style={styles.cardText}>Vendas</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    color: "#1b1b1b",
  },

  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#3498db",
    paddingVertical: 30,
    borderRadius: 12,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    elevation: 4,

    justifyContent: "center",
    alignItems: "center",
  },

  cardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
