import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { criarCarro } from "../../src/services/carroService";

export default function NovoCarroScreen() {
  const [carro, setCarro] = useState({
    modelo: "",
    marca: "",
    placa: "",
    ano: "",
    categoria: "",
    quilometragem: "",
  });

  async function salvar() {
    try {
      await criarCarro({
        ...carro,
        ano: Number(carro.ano),
        quilometragem: Number(carro.quilometragem),
      });

      Alert.alert("Sucesso", "Carro cadastrado!");
      router.replace("/carro");
    } catch (err) {
      Alert.alert("Erro", err.response?.data ?? err.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Modelo</Text>
      <TextInput
        style={styles.input}
        value={carro.modelo}
        onChangeText={(t) => setCarro({ ...carro, modelo: t })}
      />

      <Text style={styles.label}>Marca</Text>
      <TextInput
        style={styles.input}
        value={carro.marca}
        onChangeText={(t) => setCarro({ ...carro, marca: t })}
      />

      <Text style={styles.label}>Placa</Text>
      <TextInput
        style={styles.input}
        value={carro.placa}
        onChangeText={(t) => setCarro({ ...carro, placa: t })}
      />

      <Text style={styles.label}>Ano</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={carro.ano}
        onChangeText={(t) => setCarro({ ...carro, ano: t })}
      />

      <Text style={styles.label}>Categoria</Text>
      <TextInput
        style={styles.input}
        value={carro.categoria}
        onChangeText={(t) => setCarro({ ...carro, categoria: t })}
      />

      <Text style={styles.label}>Quilometragem</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={carro.quilometragem}
        onChangeText={(t) => setCarro({ ...carro, quilometragem: t })}
      />

      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },

  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 5,
  }
});
