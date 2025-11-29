import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { listarVendas } from "../../src/services/vendaService";

export default function VendaListScreen() {
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregar() {
    try {
      const data = await listarVendas();
      setVendas(data);
    } catch (err) {
      alert("Erro ao carregar vendas");
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
      <Text style={styles.title}>Vendas</Text>

      {vendas.map((v) => (
        <View key={v.id} style={styles.card}>
          <Text>Cliente: {v.cliente?.nome}</Text>
          <Text>Carro: {v.carro?.modelo}</Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => router.push(`/venda/${v.id}`)}
          >
            <Text style={styles.btnText}>Detalhes</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        onPress={() => router.push("/venda/novo")}
        style={styles.btnNovo}
      >
        <Text style={styles.btnNovoText}>+ Nova Venda</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: { padding: 12, backgroundColor: "#eee", marginBottom: 10, borderRadius: 6 },
  btn: { marginTop: 10, backgroundColor: "#3498db", padding: 10, borderRadius: 6 },
  btnText: { textAlign: "center", color: "#fff" },
  btnNovo: {
    backgroundColor: "green",
    padding: 14,
    borderRadius: 6,
    marginTop: 20,
  },
  btnNovoText: { color: "#fff", textAlign: "center", fontSize: 16 },
});
