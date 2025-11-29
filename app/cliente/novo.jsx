import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { criarCliente } from "../../src/services/clienteService";

export default function ClienteFormScreen() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");

  async function salvar() {
    try {
      await criarCliente({
        nome,
        cpf,
        telefone,
        email,
        cep,
      });

      Alert.alert("Sucesso", "Cliente cadastrado!");
      router.back();
    } catch (err) {
      console.log("ERRO CLIENTE FRONT >>>", err);
      Alert.alert("Erro", err.message || "Falha ao salvar");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Cliente</Text>

      <TextInput placeholder="Nome" style={styles.input} value={nome} onChangeText={setNome} />
      <TextInput placeholder="CPF" style={styles.input} value={cpf} onChangeText={setCpf} />
      <TextInput placeholder="Telefone" style={styles.input} value={telefone} onChangeText={setTelefone} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="CEP" style={styles.input} value={cep} onChangeText={setCep} />

      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});
