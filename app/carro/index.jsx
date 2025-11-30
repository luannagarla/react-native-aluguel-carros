import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { buscarCarros, listarCarros } from "../../src/services/carroService";

export default function CarroListScreen() {
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [filtrados, setFiltrados] = useState([]);

  async function carregar() {
    try {
      const data = await listarCarros();
      setCarros(data);
      setFiltrados(data);
    } catch (err) {
      alert("Erro ao carregar carros");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  async function filtrar(texto) {
    setBusca(texto);

    if (!texto.trim()) {
      carregar(); 
      return;
    }

    const resultado = await buscarCarros(texto);
    setFiltrados(resultado);
  }

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar por modelo, marca ou placa..."
        value={busca}
        onChangeText={filtrar}
      />

      <TouchableOpacity
        onPress={() => router.push("/carro/novo")}
        style={styles.btnNovo}
      >
        <Text style={styles.btnNovoText}>+ Novo Carro</Text>
      </TouchableOpacity>

      <FlatList
        data={filtrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/carro/${item.id}`)}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>
              {item.marca} - {item.modelo}
            </Text>
            <Text>Placa: {item.placa}</Text>
            <Text>Ano: {item.ano}</Text>
            <Text>Status: {item.excluido ? "Excluído" : "Ativo"}</Text>
            <Text>Status: {item.disponivel && !item.excluido ? "Disponível" : "Indisponível"}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
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

  btnNovo: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  btnNovoText: { color: "#fff", textAlign: "center", fontSize: 16 },

  card: {
    padding: 15,
    backgroundColor: "#eee",
    marginVertical: 6,
    borderRadius: 6,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
});
