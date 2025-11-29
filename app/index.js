import { router } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import api from "../src/services/api";

export default function LoginScreen() {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);

  async function autenticar() {
  try {
    console.log("ENVIANDO:", { matricula, senha });

    const r = await api.post("/auth/login", { matricula, senha });

    console.log("RESPOSTA:", r.data);
    router.replace("/dashboard");
  } catch (e) {
    console.log("ERRO LOGIN >>>", e);
    setErro("Credenciais inválidas");
  }
}


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {erro && <Text style={styles.erro}>{erro}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Matrícula"
        value={matricula}
        onChangeText={setMatricula}
      />

      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
      />

      <Button title="Entrar" onPress={autenticar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 80 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, padding: 12, marginBottom: 10 },
  erro: { color: "red", marginBottom: 10 },
});
