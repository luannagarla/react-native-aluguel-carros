import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { listarCarros } from "../../src/services/carroService";

export default function CarroListScreen() {
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregar() {
    try {
      const data = await listarCarros();
      setCarros(data);
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

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push("/carro/novo")}
        style={styles.btnNovo}
      >
        <Text style={styles.btnNovoText}>+ Novo Carro</Text>
      </TouchableOpacity>

      <FlatList
        data={carros}
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
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
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
