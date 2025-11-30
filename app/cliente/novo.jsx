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
      await criarCliente({ nome, cpf, telefone, email, cep });

      Alert.alert("Sucesso", "Cliente cadastrado!");
      router.replace("/cliente");
    } catch (err) {
      Alert.alert("Erro", err.message || "Falha ao salvar");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Cliente</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        placeholder="Digite o nome"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>CPF</Text>
      <TextInput
        placeholder="Somente números"
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        placeholder="DDD + número"
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="email@exemplo.com"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>CEP</Text>
      <TextInput
        placeholder="Somente números"
        style={styles.input}
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
      />

      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderColor: "#ccc",
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
});
