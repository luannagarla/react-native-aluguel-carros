import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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

  const [showClientes, setShowClientes] = useState(false);
  const [showFuncionarios, setShowFuncionarios] = useState(false);
  const [showCarros, setShowCarros] = useState(false);

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
      router.replace("/venda"); 
    } catch (e) {
      Alert.alert("Erro", e.message || "Falha ao salvar venda");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nova Venda</Text>

      {/* ----------------------------- CLIENTE ----------------------------- */}
      <Text style={styles.label}>Cliente</Text>

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowClientes(!showClientes)}
      >
        <Text style={styles.dropdownText}>
          {clienteId
            ? clientes.find((c) => c.id === clienteId)?.nome
            : "Selecione um cliente"}
        </Text>
      </TouchableOpacity>

      {showClientes && (
        <View style={styles.dropdownList}>
          {clientes.map((c) => (
            <TouchableOpacity
              key={c.id}
              onPress={() => {
                setClienteId(c.id);
                setShowClientes(false);
              }}
              style={styles.dropdownItem}
            >
              <Text>{c.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* ----------------------------- FUNCIONÁRIO ----------------------------- */}
      <Text style={styles.label}>Funcionário</Text>

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowFuncionarios(!showFuncionarios)}
      >
        <Text style={styles.dropdownText}>
          {funcionarioId
            ? funcionarios.find((f) => f.id === funcionarioId)?.nome
            : "Selecione um funcionário"}
        </Text>
      </TouchableOpacity>

      {showFuncionarios && (
        <View style={styles.dropdownList}>
          {funcionarios.map((f) => (
            <TouchableOpacity
              key={f.id}
              onPress={() => {
                setFuncionarioId(f.id);
                setShowFuncionarios(false);
              }}
              style={styles.dropdownItem}
            >
              <Text>{f.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* ----------------------------- CARRO ----------------------------- */}
      <Text style={styles.label}>Carro Disponível</Text>

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowCarros(!showCarros)}
      >
        <Text style={styles.dropdownText}>
          {carroId
            ? carros.find((car) => car.id === carroId)?.modelo +
              " - " +
              carros.find((car) => car.id === carroId)?.placa
            : "Selecione um carro"}
        </Text>
      </TouchableOpacity>

      {showCarros && (
        <View style={styles.dropdownList}>
          {carros.map((car) => (
            <TouchableOpacity
              key={car.id}
              onPress={() => {
                setCarroId(car.id);
                setShowCarros(false);
              }}
              style={styles.dropdownItem}
            >
              <Text>{car.modelo} - {car.placa}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* ----------------------------- CAMPOS ----------------------------- */}
      <Text style={styles.label}>Data Início</Text>
      <TextInput
        placeholder="AAAA-MM-DD"
        style={styles.input}
        value={dataInicio}
        onChangeText={setDataInicio}
      />

      <Text style={styles.label}>Data Fim</Text>
      <TextInput
        placeholder="AAAA-MM-DD"
        style={styles.input}
        value={dataFim}
        onChangeText={setDataFim}
      />

      <Text style={styles.label}>Valor Total</Text>
      <TextInput
        placeholder="Ex: 1200.50"
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

  label: {
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
  },

  // INPUTS
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
  },

  // DROPDOWN BASE
  dropdown: {
    padding: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  dropdownText: {
    color: "#333",
  },

  dropdownList: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginTop: 5,
    marginBottom: 10,
  },

  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
