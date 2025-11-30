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

import { criarFuncionario } from "../../src/services/funcionarioService";

export default function FuncionarioFormScreen() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [matricula, setMatricula] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState("");

  async function salvar() {
    try {
      await criarFuncionario({
        nome,
        cpf,
        telefone,
        matricula,
        login,
        senha,
        cargo,
      });

      Alert.alert("Sucesso", "Funcionário cadastrado!");
      router.replace("/funcionario"); 
    } catch (err) {
      Alert.alert("Erro", err.message || "Falha ao salvar");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Funcionário</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        value={cpf}
        keyboardType="numeric"
        onChangeText={setCpf}
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        value={telefone}
        keyboardType="phone-pad"
        onChangeText={setTelefone}
      />

      <Text style={styles.label}>Matrícula</Text>
      <TextInput
        style={styles.input}
        value={matricula}
        onChangeText={setMatricula}
      />

      <Text style={styles.label}>Login</Text>
      <TextInput
        style={styles.input}
        value={login}
        onChangeText={setLogin}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Text style={styles.label}>Cargo</Text>
      <TextInput
        style={styles.input}
        value={cargo}
        onChangeText={setCargo}
      />

      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
});
