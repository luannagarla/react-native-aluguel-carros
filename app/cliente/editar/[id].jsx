import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { buscarCliente, criarCliente } from "../../../src/services/clienteService";

export default function ClienteEditarScreen() {
  const { id } = useLocalSearchParams();

  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    cep: "",
  });

  async function carregar() {
    try {
      const data = await buscarCliente(id);
      setForm(data);
    } catch (err) {
      Alert.alert("Erro", "Cliente não encontrado");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function salvar() {
    try {
      await criarCliente(form, id); 
      Alert.alert("Sucesso", "Cliente atualizado!");
      router.replace("/cliente");
    } catch (err) {
      Alert.alert("Erro", err.message || "Falha ao salvar");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Cliente</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={form.nome}
        onChangeText={(t) => setForm({ ...form, nome: t })}
      />

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        value={form.cpf}
        onChangeText={(t) => setForm({ ...form, cpf: t })}
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        value={form.telefone}
        onChangeText={(t) => setForm({ ...form, telefone: t })}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={form.email}
        onChangeText={(t) => setForm({ ...form, email: t })}
      />

      <Text style={styles.label}>CEP</Text>
      <TextInput
        style={styles.input}
        value={form.cep}
        onChangeText={(t) => setForm({ ...form, cep: t })}
      />

      <Button title="Salvar Alterações" onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderColor: "#ccc",
  },
});
