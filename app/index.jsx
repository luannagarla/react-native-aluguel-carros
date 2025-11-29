import { router } from "expo-router";
import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import api from "../src/services/api";

export default function LoginScreen() {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);

  async function autenticar() {
    try {
      setErro(null);
      const r = await api.post("/auth/login", { matricula, senha });
      router.replace("/dashboard");
    } catch (e) {
      setErro("Credenciais inválidas");
    }
  }

  return (
    <ImageBackground
      source={require("../assets/images/homepage.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.wrapper}>
        <View style={styles.card}>

          <Text style={styles.title}>Aluguel de Carros - Lua Car</Text>
          <Text style={styles.subtitle}>Bem-vinda (a) ao melhor sistema de aluguel de carros do quarto semestre de CDIA - UEL</Text>

          {erro && <Text style={styles.erro}>{erro}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Matrícula"
            placeholderTextColor="#ccc"
            value={matricula}
            onChangeText={setMatricula}
          />

          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#ccc"
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity style={styles.btn} onPress={autenticar}>
            <Text style={styles.btnText}>Entrar</Text>
          </TouchableOpacity>

          <Text style={styles.subtitle}>Desenvolvido para Prova 2 - Java + Spring Boot + MySQL + React Native</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // escurece a imagem
  },

  wrapper: {
    width: "100%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 25,
    borderRadius: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
    color: "#000000"
  },

  subtitle: {
    textAlign: "center",
    color: "#000000",
    marginBottom: 25,
    fontSize: 15,
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 14,
    marginBottom: 14,
    borderRadius: 8,
    fontSize: 16,
  },

  btn: {
    backgroundColor: "#3498db",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 5,
  },

  btnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },

  erro: {
    color: "#ff8080",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 14,
  },
});
