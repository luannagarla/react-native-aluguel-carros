import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { buscarCarro, excluirCarro } from "../../src/services/carroService";

export default function CarroDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [carro, setCarro] = useState(null);
  const [erro, setErro] = useState(null);

  async function carregar() {
    try {
      const data = await buscarCarro(id);
      setCarro(data);
    } catch (err) {
      setErro("Carro não encontrado");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

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

      <Button
        title="Excluir"
        color="red"
        onPress={() =>
          Alert.alert("Confirmação", "Deseja excluir este carro?", [
            { text: "Cancelar" },
            {
              text: "Excluir",
              onPress: async () => {
                try {
                  await excluirCarro(id);
                  router.back();
                } catch (err) {
                  alert("Erro ao excluir");
                }
              },
            },
          ])
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  item: { fontSize: 18, marginBottom: 10 },
  erro: { color: "red", marginBottom: 10, fontSize: 16 },
});
