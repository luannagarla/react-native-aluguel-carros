import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { buscarVenda, excluirVenda } from "../../src/services/vendaService";

export default function VendaDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [venda, setVenda] = useState(null);
  const [erro, setErro] = useState(null);

  async function carregar() {
    try {
      const data = await buscarVenda(id);
      setVenda(data);
    } catch (e) {
      setErro("Venda não encontrada");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  if (!venda && !erro)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalhes da Venda</Text>

      {erro && <Text style={styles.erro}>{erro}</Text>}

      {venda && (
        <>
          <Text style={styles.item}>Cliente: {venda.cliente.nome}</Text>
          <Text style={styles.item}>Funcionário: {venda.funcionario.nome}</Text>
          <Text style={styles.item}>Carro: {venda.carro.modelo}</Text>
          <Text style={styles.item}>Placa: {venda.carro.placa}</Text>
          <Text style={styles.item}>Data Início: {venda.dataInicio}</Text>
          <Text style={styles.item}>Data Fim: {venda.dataFim}</Text>
          <Text style={styles.item}>Valor Total: R$ {venda.valorTotal}</Text>
        </>
      )}

      <Button
        title="Excluir"
        color="red"
        onPress={() =>
          Alert.alert("Confirmação", "Deseja excluir esta venda?", [
            { text: "Cancelar" },
            {
              text: "Excluir",
              onPress: async () => {
                await excluirVenda(id);
                router.replace("/venda");
              },
            },
          ])
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  item: { fontSize: 18, marginBottom: 12 },
  erro: { color: "red" },
});
