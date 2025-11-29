import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <Button title="Carros" onPress={() => router.push("/carro")} />
      <Button title="Clientes" onPress={() => router.push("/cliente")} />
      <Button title="Funcionarios" onPress={() => router.push("/funcionario")} />
      <Button title="Vendas" onPress={() => router.push("/venda")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
});
