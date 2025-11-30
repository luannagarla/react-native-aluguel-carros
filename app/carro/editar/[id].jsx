import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { atualizarCarro, buscarCarro } from "../../../src/services/carroService";

export default function EditarCarroScreen() {
  const params = useLocalSearchParams();
  const id = Number(Array.isArray(params.id) ? params.id[0] : params.id);

  const [carro, setCarro] = useState(null);
  const [loading, setLoading] = useState(true);

  async function carregar() {
    try {
      const data = await buscarCarro(id);
      setCarro(data);
    } catch (err) {
      Alert.alert("Erro", "Não foi possível carregar o carro.");
      
      router.replace("/carro");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, [id]);

  async function salvar() {
    try {
      await atualizarCarro(id, carro);
      Alert.alert("Sucesso", "Carro atualizado com sucesso!");
      
      router.replace("/carro");
    } catch (err) {
      Alert.alert("Erro", err.message || "Erro ao atualizar o carro.");
    }
  }

  if (loading || !carro)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Carro</Text>

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
        value={String(carro.ano)}
        keyboardType="numeric"
        onChangeText={(t) => setCarro({ ...carro, ano: Number(t) })}
      />

      <TouchableOpacity style={styles.btnSalvar} onPress={salvar}>
        <Text style={styles.btnSalvarText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },

  btnSalvar: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },

  btnSalvarText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
