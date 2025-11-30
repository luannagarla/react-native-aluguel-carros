import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { buscarCliente, excluirCliente } from "../../src/services/clienteService";

export default function ClienteDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [cliente, setCliente] = useState(null);
  const [erro, setErro] = useState(null);

  async function carregar() {
    try {
      const data = await buscarCliente(id);
      setCliente(data);
    } catch (err) {
      setErro("Cliente não encontrado");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  if (!cliente && !erro)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Cliente</Text>

      {erro && <Text style={styles.erro}>{erro}</Text>}

      {cliente && (
        <View style={styles.card}>
          <Text style={styles.item}><Text style={styles.label}>Nome:</Text> {cliente.nome}</Text>
          <Text style={styles.item}><Text style={styles.label}>CPF:</Text> {cliente.cpf}</Text>
          <Text style={styles.item}><Text style={styles.label}>Telefone:</Text> {cliente.telefone}</Text>
          <Text style={styles.item}><Text style={styles.label}>Email:</Text> {cliente.email}</Text>
          <Text style={styles.item}><Text style={styles.label}>CEP:</Text> {cliente.cep}</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.btn, styles.btnEditar]}
        onPress={() => router.push(`/cliente/editar/${id}`)}
      >
        <Text style={styles.btnText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, styles.btnExcluir]}
        onPress={() =>
          Alert.alert("Confirmação", "Deseja excluir este cliente?", [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Excluir",
              style: "destructive",
              onPress: async () => {
                try {
                  await excluirCliente(id);
                  Alert.alert("Sucesso", "Cliente excluído!");
                  router.replace("/cliente");
                } catch (err) {
                  Alert.alert("Erro", err.message || "Erro ao excluir");
                }
              },
            },
          ])
        }
      >
        <Text style={styles.btnText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontWeight: "bold" },

  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  item: { fontSize: 18, marginBottom: 10 },

  erro: { color: "red", marginBottom: 10, fontSize: 16 },

  btn: {
    padding: 14,
    borderRadius: 8,
    marginBottom: 15,
  },

  btnEditar: {
    backgroundColor: "#3498db",
  },

  btnExcluir: {
    backgroundColor: "#e74c3c",
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
