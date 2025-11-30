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

import {
  buscarFuncionarios,
  listarFuncionarios,
} from "../../src/services/funcionarioService";

export default function FuncionarioListScreen() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  async function carregar() {
    try {
      const data = await listarFuncionarios();
      setFuncionarios(data);
      setFiltrados(data);
    } catch (err) {
      alert("Erro ao carregar funcionários");
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
      setFiltrados(funcionarios);
      return;
    }

    try {
      const data = await buscarFuncionarios(texto);
      setFiltrados(data);
    } catch (e) {
      console.log("ERRO FILTRO FUNCIONARIOS >>", e);
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
      <Text style={styles.title}>Funcionários</Text>

      <TextInput
        placeholder="Buscar por nome..."
        value={busca}
        onChangeText={filtrar}
        style={styles.input}
      />

      {filtrados.map((f) => (
        <View key={f.id} style={styles.card}>
          <Text style={styles.cardTitle}>{f.nome}</Text>
          <Text>Cargo: {f.cargo}</Text>
          <Text>Status: {f.excluido ? "Excluído" : "Ativo"}</Text>

          <TouchableOpacity
            onPress={() => router.push(`/funcionario/${f.id}`)}
            style={styles.btnDetalhes}
          >
            <Text style={styles.btnDetalhesText}>Detalhes</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        onPress={() => router.push("/funcionario/novo")}
        style={styles.btnNovo}
      >
        <Text style={styles.btnNovoText}>+ Novo Funcionário</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },

  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },

  card: {
    backgroundColor: "#eee",
    padding: 15,
    marginBottom: 12,
    borderRadius: 6,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },

  btnDetalhes: {
    marginTop: 10,
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 6,
  },
  btnDetalhesText: { textAlign: "center", color: "#fff" },

  btnNovo: {
    backgroundColor: "green",
    padding: 14,
    borderRadius: 6,
    marginTop: 20,
  },
  btnNovoText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
