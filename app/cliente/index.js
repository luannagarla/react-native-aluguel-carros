import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { listarClientes } from "../../src/services/clienteService";

export default function ClienteListScreen() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregar() {
    try {
      const data = await listarClientes();
      setClientes(data);
    } catch (err) {
      console.log("ERRO LISTAR CLIENTES >>", err);
      alert("Erro ao carregar clientes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Clientes</Text>

      {clientes.map((c) => (
        <View key={c.id} style={styles.card}>
          <Text style={styles.cardTitle}>{c.nome}</Text>
          <Text>CPF: {c.cpf}</Text>

          <TouchableOpacity
            onPress={() => router.push(`/cliente/${c.id}`)}
            style={styles.btnDetalhes}
          >
            <Text style={styles.btnDetalhesText}>Detalhes</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        onPress={() => router.push("/cliente/novo")}
        style={styles.btnNovo}
      >
        <Text style={styles.btnNovoText}>+ Novo Cliente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#eee",
    padding: 15,
    marginBottom: 12,
    borderRadius: 6,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  btnDetalhes: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  btnDetalhesText: { color: "#fff", textAlign: "center" },
  btnNovo: {
    padding: 14,
    borderRadius: 6,
    backgroundColor: "green",
    marginTop: 15,
  },
  btnNovoText: { color: "#fff", textAlign: "center", fontSize: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});
