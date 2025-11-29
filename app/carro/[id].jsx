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
import { buscarCarro, excluirCarro } from "../../src/services/carroService";

export default function CarroDetailsScreen() {
  const params = useLocalSearchParams();

  const id = Number(Array.isArray(params.id) ? params.id[0] : params.id);

  const [carro, setCarro] = useState(null);
  const [erro, setErro] = useState(null);

  async function carregar() {
    try {
      console.log("🔎 Buscando carro ID:", id);
      const data = await buscarCarro(id);
      setCarro(data);
    } catch (err) {
      console.log("❌ Erro ao buscar:", err);
      setErro("Carro não encontrado");
    }
  }

  useEffect(() => {
    carregar();
  }, [id]);

  if (!carro && !erro)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Carro</Text>

      {erro && <Text style={styles.erro}>{erro}</Text>}

      {carro && (
        <>
          <Text style={styles.item}>Modelo: {carro.modelo}</Text>
          <Text style={styles.item}>Marca: {carro.marca}</Text>
          <Text style={styles.item}>Placa: {carro.placa}</Text>
          <Text style={styles.item}>Ano: {carro.ano}</Text>
        </>
      )}

      <TouchableOpacity
        style={styles.btnExcluir}
        onPress={() =>
          Alert.alert("Confirmação", "Deseja excluir este carro?", [
            { text: "Cancelar" },
            {
              text: "Excluir",
              onPress: async () => {
                console.log("🗑 Excluindo carro ID:", id);
                try {
                  await excluirCarro(id);
                  Alert.alert("Sucesso", "Carro excluído!");
                  router.back();
                } catch (err) {
                  Alert.alert("Erro", err.message || "Erro ao excluir");
                }
              },
            },
          ])
        }
      >
        <Text style={styles.txtExcluir}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  item: { fontSize: 18, marginBottom: 10 },
  erro: { color: "red", marginBottom: 10, fontSize: 16 },

  btnExcluir: {
    backgroundColor: "red",
    padding: 14,
    borderRadius: 8,
    marginTop: 30,
  },
  txtExcluir: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
