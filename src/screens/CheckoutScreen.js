import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Modal, Animated } from 'react-native';

export default function CheckoutScreen({ navigation, route }) {
  const { total, userId } = route.params; // userId viene desde CartScreen
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [tarjeta, setTarjeta] = useState('');
  const [cvv, setCvv] = useState('');
  const [expira, setExpira] = useState('');
  const [successModal, setSuccessModal] = useState(false);
  const [scale] = useState(new Animated.Value(0));

  // Formatear número de tarjeta en bloques de 4
  const handleTarjeta = (text) => {
    let cleaned = text.replace(/\D/g, '').slice(0, 16);
    let formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    setTarjeta(formatted);
  };

  // Formatear fecha MM/AA con pleca automática
  const handleExpira = (text) => {
    let cleaned = text.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 3) {
      cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    setExpira(cleaned);
  };

  // Solo números, máximo 4 dígitos
  const handleCvv = (text) => {
    setCvv(text.replace(/\D/g, '').slice(0, 4));
  };

  const handlePagar = async () => {
    if (!nombre || !direccion || !tarjeta || !cvv || !expira) {
      Alert.alert('Completa todos los campos');
      return;
    }
    if (tarjeta.replace(/\s/g, '').length !== 16) {
      Alert.alert('Número de tarjeta inválido');
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expira)) {
      Alert.alert('Fecha de expiración inválida');
      return;
    }
    if (cvv.length < 3) {
      Alert.alert('CVV inválido');
      return;
    }

    try {
      const res = await fetch('http://192.168.1.33/ProyectoDPS_final/src/api/comprar_carrito.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (!data.success) {
        Alert.alert('Error', data.message || 'No se pudo completar la compra');
        return;
      }
    } catch (e) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
      return;
    }

    setSuccessModal(true);
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
    setTimeout(() => {
      setSuccessModal(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre completo</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={text => setNombre(text.slice(0, 40))}
        placeholder="Nombre"
        maxLength={40}
      />
      <Text style={styles.label}>Dirección de envío</Text>
      <TextInput
        style={styles.input}
        value={direccion}
        onChangeText={text => setDireccion(text.slice(0, 80))}
        placeholder="Dirección"
        maxLength={80}
      />
      <Text style={styles.label}>Número de tarjeta</Text>
      <TextInput
        style={styles.input}
        value={tarjeta}
        onChangeText={handleTarjeta}
        placeholder="1234 5678 9012 3456"
        keyboardType="numeric"
        maxLength={19}
      />
      <Text style={styles.label}>Fecha de expiración</Text>
      <TextInput
        style={styles.input}
        value={expira}
        onChangeText={handleExpira}
        placeholder="MM/AA"
        keyboardType="numeric"
        maxLength={5}
      />
      <Text style={styles.label}>CVV</Text>
      <TextInput
        style={styles.input}
        value={cvv}
        onChangeText={handleCvv}
        placeholder="CVV"
        keyboardType="numeric"
        maxLength={4}
        secureTextEntry
      />
      <Text style={styles.total}>Total a pagar: ${total?.toFixed(2)}</Text>
      <Button title="Pagar" onPress={handlePagar} color="#28a745" />
      <View style={{ height: 12 }} />
      <Button title="Regresar" onPress={() => navigation.goBack()} color="#6c757d" />

      {/* Modal de éxito */}
      <Modal visible={successModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.successModal, { transform: [{ scale }] }]}>
            <Text style={styles.check}>✔️</Text>
            <Text style={styles.successText}>¡Compra realizada!</Text>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f4f6fb' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 12, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginTop: 4, backgroundColor: '#fff' },
  total: { fontSize: 20, fontWeight: 'bold', marginVertical: 16, textAlign: 'center', color: '#28a745' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    elevation: 8,
  },
  check: { fontSize: 60, color: '#28a745', marginBottom: 12 },
  successText: { fontSize: 22, fontWeight: 'bold', color: '#28a745' },
});