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
      router.back();
    } catch (err) {
      Alert.alert("Erro", err.message || "Falha ao salvar");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Funcionário</Text>

      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="CPF" value={cpf} onChangeText={setCpf} />
      <TextInput style={styles.input} placeholder="Telefone" value={telefone} onChangeText={setTelefone} />
      <TextInput style={styles.input} placeholder="Matrícula" value={matricula} onChangeText={setMatricula} />
      <TextInput style={styles.input} placeholder="Login" value={login} onChangeText={setLogin} />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TextInput style={styles.input} placeholder="Cargo" value={cargo} onChangeText={setCargo} />

      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});
