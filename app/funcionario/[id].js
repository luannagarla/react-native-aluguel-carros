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
import {
  buscarFuncionario,
  excluirFuncionario,
} from "../../src/services/funcionarioService";

export default function FuncionarioDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [funcionario, setFuncionario] = useState(null);
  const [erro, setErro] = useState(null);

  async function carregar() {
    try {
      const data = await buscarFuncionario(id);
      setFuncionario(data);
    } catch (err) {
      setErro("Funcionário não encontrado");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  if (!funcionario && !erro)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Funcionário</Text>

      {erro && <Text style={styles.erro}>{erro}</Text>}

      {funcionario && (
        <>
          <Text style={styles.item}>Nome: {funcionario.nome}</Text>
          <Text style={styles.item}>CPF: {funcionario.cpf}</Text>
          <Text style={styles.item}>Telefone: {funcionario.telefone}</Text>
          <Text style={styles.item}>Matrícula: {funcionario.matricula}</Text>
          <Text style={styles.item}>Cargo: {funcionario.cargo}</Text>
        </>
      )}

      <Button
        title="Excluir"
        color="red"
        onPress={() =>
          Alert.alert("Confirmação", "Excluir este funcionário?", [
            { text: "Cancelar" },
            {
              text: "Excluir",
              onPress: async () => {
                await excluirFuncionario(id);
                router.back();
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
  erro: { color: "red", fontSize: 16 },
});
