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
        <>
          <Text style={styles.item}>Nome: {cliente.nome}</Text>
          <Text style={styles.item}>CPF: {cliente.cpf}</Text>
          <Text style={styles.item}>Telefone: {cliente.telefone}</Text>
          <Text style={styles.item}>Email: {cliente.email}</Text>
          <Text style={styles.item}>CEP: {cliente.cep}</Text>
        </>
      )}

      <Button
        title="Excluir"
        color="red"
        onPress={() =>
          Alert.alert("Confirmação", "Deseja excluir este cliente?", [
            { text: "Cancelar" },
            {
              text: "Excluir",
              onPress: async () => {
                try {
                  await excluirCliente(id);
                  router.back();
                } catch (err) {
                  alert(JSON.stringify(err.message));
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
