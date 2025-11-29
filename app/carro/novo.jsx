import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import { criarCarro } from "../../src/services/carroService";

export default function NovoCarroScreen() {
  const [carro, setCarro] = useState({
    modelo: "",
    marca: "",
    placa: "",
    ano: "",
  });

  async function salvar() {
    try {
      await criarCarro(carro);
      Alert.alert("Sucesso", "Carro cadastrado!");
      router.back();
    } catch (err) {
      Alert.alert("Erro", err.message);
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Modelo"
        value={carro.modelo}
        onChangeText={(t) => setCarro({ ...carro, modelo: t })}
      />
      <TextInput
        placeholder="Marca"
        value={carro.marca}
        onChangeText={(t) => setCarro({ ...carro, marca: t })}
      />
      <TextInput
        placeholder="Placa"
        value={carro.placa}
        onChangeText={(t) => setCarro({ ...carro, placa: t })}
      />
      <TextInput
        placeholder="Ano"
        value={carro.ano}
        onChangeText={(t) => setCarro({ ...carro, ano: t })}
      />

      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}
