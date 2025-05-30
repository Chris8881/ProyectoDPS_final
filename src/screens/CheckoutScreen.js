import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function CheckoutScreen({ navigation, route }) {
  const { total } = route.params;
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [tarjeta, setTarjeta] = useState('');
  const [cvv, setCvv] = useState('');
  const [expira, setExpira] = useState('');

  const handlePagar = () => {
    if (!nombre || !direccion || !tarjeta || !cvv || !expira) {
      Alert.alert('Completa todos los campos');
      return;
    }
    // Aquí puedes hacer la petición para procesar el pago
    Alert.alert('¡Compra realizada!', 'Gracias por tu compra.');
    navigation.popToTop(); // Regresa al inicio
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.label}>Nombre completo</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Nombre" />
      <Text style={styles.label}>Dirección de envío</Text>
      <TextInput style={styles.input} value={direccion} onChangeText={setDireccion} placeholder="Dirección" />
      <Text style={styles.label}>Número de tarjeta</Text>
      <TextInput style={styles.input} value={tarjeta} onChangeText={setTarjeta} placeholder="1234 5678 9012 3456" keyboardType="numeric" maxLength={19} />
      <Text style={styles.label}>Fecha de expiración</Text>
      <TextInput style={styles.input} value={expira} onChangeText={setExpira} placeholder="MM/AA" maxLength={5} />
      <Text style={styles.label}>CVV</Text>
      <TextInput style={styles.input} value={cvv} onChangeText={setCvv} placeholder="CVV" keyboardType="numeric" maxLength={4} secureTextEntry />
      <Text style={styles.total}>Total a pagar: ${total?.toFixed(2)}</Text>
      <Button title="Pagar" onPress={handlePagar} color="#28a745" />
      <View style={{ height: 12 }} />
      <Button title="Regresar" onPress={() => navigation.goBack()} color="#6c757d" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f4f6fb' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, color: '#007bff', textAlign: 'center' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 12, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginTop: 4, backgroundColor: '#fff' },
  total: { fontSize: 20, fontWeight: 'bold', marginVertical: 16, textAlign: 'center', color: '#28a745' },
});