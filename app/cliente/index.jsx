import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { buscarClientes, listarClientes } from "../../src/services/clienteService";

export default function ClienteListScreen() {
  const [clientes, setClientes] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  async function carregar() {
    try {
      const data = await listarClientes();
      setClientes(data);
      setFiltrados(data);
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

  async function filtrar(texto) {
    setBusca(texto);

    if (!texto.trim()) {
      setFiltrados(clientes); 
      return;
    }

    try {
      const data = await buscarClientes(texto);
      setFiltrados(data);
    } catch (e) {
      console.log("ERRO FILTRAR CLIENTES >>", e);
    }
  }

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Clientes</Text>

      <TextInput
        placeholder="Buscar por nome..."
        style={styles.input}
        value={busca}
        onChangeText={filtrar}
      />

      <TouchableOpacity
        onPress={() => router.push("/cliente/novo")}
        style={styles.btnNovo}
      >
        <Text style={styles.btnNovoText}>+ Novo Cliente</Text>
      </TouchableOpacity>

      {filtrados.map((c) => (
        <View key={c.id} style={styles.card}>
          <Text style={styles.cardTitle}>{c.nome}</Text>
          <Text>CPF: {c.cpf}</Text>
          <Text>Status: {c.excluido ? "Excluído" : "Ativo"}</Text>

          <TouchableOpacity
            onPress={() => router.push(`/cliente/${c.id}`)}
            style={styles.btnDetalhes}
          >
            <Text style={styles.btnDetalhesText}>Detalhes</Text>
          </TouchableOpacity>
        </View>
      ))}

      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: "#000",
  },

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
