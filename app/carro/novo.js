import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { criarCarro } from "../../src/services/carroService";

export default function CarroFormScreen() {
  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [placa, setPlaca] = useState("");
  const [ano, setAno] = useState("");
  const [categoria, setCategoria] = useState("");
  const [quilometragem, setQuilometragem] = useState("");

  async function salvar() {
    try {
      await criarCarro({
        modelo,
        marca,
        placa,
        ano: Number(ano),
        categoria,
        quilometragem: Number(quilometragem),
      });

      Alert.alert("Sucesso", "Carro cadastrado!", [
        { text: "OK", onPress: () => router.back() }
      ]);

    } catch (err) {
      Alert.alert(
        "Erro ao salvar",
        err?.message || "Falha inesperada"
      );
    }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Carro</Text>

      <TextInput
        placeholder="Modelo"
        style={styles.input}
        value={modelo}
        onChangeText={setModelo}
      />
      <TextInput
        placeholder="Marca"
        style={styles.input}
        value={marca}
        onChangeText={setMarca}
      />
      <TextInput
        placeholder="Placa"
        style={styles.input}
        value={placa}
        onChangeText={setPlaca}
      />
      <TextInput
        placeholder="Ano"
        style={styles.input}
        value={ano}
        keyboardType="numeric"
        onChangeText={setAno}
      />

      <TextInput
        placeholder="Categoria"
        style={styles.input}
        value={categoria}
        onChangeText={setCategoria}
      />

      <TextInput
        placeholder="Quilometragem"
        style={styles.input}
        value={quilometragem}
        keyboardType="numeric"
        onChangeText={setQuilometragem}
      />

      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 22 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
});
