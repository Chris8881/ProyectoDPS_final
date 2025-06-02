import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AdminDashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Administrador</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CRUDProductos')}>
        <Text style={styles.buttonText}>Gestionar Productos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#dc3545' }]} onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f6fb', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 32 },
  button: { backgroundColor: '#007bff', padding: 16, borderRadius: 8, marginBottom: 18, width: 240, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});