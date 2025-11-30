import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  atualizarFuncionario,
  buscarFuncionario,
} from "../../../src/services/funcionarioService";

export default function FuncionarioEditarScreen() {
  const { id } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    matricula: "",
    login: "",
    senha: "",
    cargo: "",
  });

  async function carregar() {
    try {
      const data = await buscarFuncionario(id);

      setForm({
        nome: data.nome ?? "",
        cpf: data.cpf ?? "",
        telefone: data.telefone ?? "",
        matricula: data.matricula ?? "",
        login: data.login ?? "",
        cargo: data.cargo ?? "",
        senha: "", // senha nunca vem do backend
      });

    } catch (err) {
      Alert.alert("Erro", "Funcionário não encontrado");
      router.replace("/funcionario"); 
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function salvar() {
    try {
      const payload = { ...form };

      // Se a senha não for digitada, não envia o campo
      if (!payload.senha.trim()) {
        delete payload.senha;
      }

      await atualizarFuncionario(id, payload);

      Alert.alert("Sucesso", "Funcionário atualizado!");
      router.replace("/funcionario");

    } catch (err) {
      Alert.alert("Erro", err.message || "Falha ao salvar alterações");
    }
  }

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Funcionário</Text>

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
        keyboardType="numeric"
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        value={form.telefone}
        onChangeText={(t) => setForm({ ...form, telefone: t })}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Matrícula</Text>
      <TextInput
        style={styles.input}
        value={form.matricula}
        onChangeText={(t) => setForm({ ...form, matricula: t })}
      />

      <Text style={styles.label}>Login</Text>
      <TextInput
        style={styles.input}
        value={form.login}
        onChangeText={(t) => setForm({ ...form, login: t })}
      />

      <Text style={styles.label}>Senha (digite para alterar)</Text>
      <TextInput
        style={styles.input}
        value={form.senha}
        secureTextEntry
        onChangeText={(t) => setForm({ ...form, senha: t })}
      />

      <Text style={styles.label}>Cargo</Text>
      <TextInput
        style={styles.input}
        value={form.cargo}
        onChangeText={(t) => setForm({ ...form, cargo: t })}
      />

      <TouchableOpacity style={styles.btnSalvar} onPress={salvar}>
        <Text style={styles.btnText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },

  label: { fontSize: 16, fontWeight: "600", marginBottom: 5 },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
    backgroundColor: "#fff",
  },

  btnSalvar: {
    backgroundColor: "#3498db",
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },

  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
