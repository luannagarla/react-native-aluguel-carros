import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput
} from "react-native";
import api from "../../src/services/api";
import { criarVenda } from "../../src/services/vendaService";

export default function VendaFormScreen() {
  const [clientes, setClientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [carros, setCarros] = useState([]);

  const [clienteId, setClienteId] = useState(null);
  const [funcionarioId, setFuncionarioId] = useState(null);
  const [carroId, setCarroId] = useState(null);

  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [valorTotal, setValorTotal] = useState("");

  async function carregar() {
    try {
      const c = await api.get("/clientes");
      const f = await api.get("/funcionarios");
      const cr = await api.get("/carros");

      setClientes(c.data);
      setFuncionarios(f.data);
      setCarros(cr.data.filter((x) => x.disponivel === true));
    } catch (err) {
      console.log("ERRO CARREGAR", err);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function salvar() {
    if (!clienteId || !funcionarioId || !carroId) {
      Alert.alert("Erro", "Selecione cliente, funcionário e carro.");
      return;
    }

    try {
      await criarVenda({
        cliente: { id: Number(clienteId) },
        funcionario: { id: Number(funcionarioId) },
        carro: { id: Number(carroId) },
        dataInicio,
        dataFim,
        valorTotal: Number(valorTotal),
      });

      Alert.alert("Sucesso", "Venda cadastrada!");
      router.back();
    } catch (e) {
      Alert.alert("Erro", e.message || "Falha ao salvar venda");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nova Venda</Text>

      {/* CLIENTE */}
      <Text style={styles.label}>Cliente</Text>
      {clientes.map((c) => (
        <Pressable
          key={c.id}
          onPress={() => setClienteId(c.id)}
          style={[
            styles.selectItem,
            clienteId === c.id && styles.selectItemSelected,
          ]}
        >
          <Text>{c.nome}</Text>
        </Pressable>
      ))}

      {/* FUNCIONARIO */}
      <Text style={styles.label}>Funcionário</Text>
      {funcionarios.map((f) => (
        <Pressable
          key={f.id}
          onPress={() => setFuncionarioId(f.id)}
          style={[
            styles.selectItem,
            funcionarioId === f.id && styles.selectItemSelected,
          ]}
        >
          <Text>{f.nome}</Text>
        </Pressable>
      ))}

      {/* CARRO */}
      <Text style={styles.label}>Carro Disponível</Text>
      {carros.map((car) => (
        <Pressable
          key={car.id}
          onPress={() => setCarroId(car.id)}
          style={[
            styles.selectItem,
            carroId === car.id && styles.selectItemSelected,
          ]}
        >
          <Text>{car.modelo} - {car.placa}</Text>
        </Pressable>
      ))}

      {/* CAMPOS */}
      <TextInput
        placeholder="Data início (AAAA-MM-DD)"
        style={styles.input}
        value={dataInicio}
        onChangeText={setDataInicio}
      />

      <TextInput
        placeholder="Data fim (AAAA-MM-DD)"
        style={styles.input}
        value={dataFim}
        onChangeText={setDataFim}
      />

      <TextInput
        placeholder="Valor total"
        style={styles.input}
        keyboardType="numeric"
        value={valorTotal}
        onChangeText={setValorTotal}
      />

      <Button title="Salvar" onPress={salvar} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  label: { fontWeight: "bold", marginTop: 15, marginBottom: 5 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  selectItem: {
    padding: 12,
    backgroundColor: "#eee",
    marginBottom: 6,
    borderRadius: 6,
  },
  selectItemSelected: {
    backgroundColor: "#cce5ff",
    borderWidth: 1,
    borderColor: "#007bff",
  },
});
