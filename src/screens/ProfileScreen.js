import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function ProfileScreen({ navigation }) {
  // Aquí puedes traer los datos del usuario desde tu backend o contexto
  const user = {
    nombre: 'Usuario Ejemplo',
    email: 'usuario@ejemplo.com',
    // Agrega más campos si lo deseas
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.value}>{user.nombre}</Text>
      <Text style={styles.label}>Correo:</Text>
      <Text style={styles.value}>{user.email}</Text>
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f4f6fb' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, color: '#007bff' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 12, color: '#333' },
  value: { fontSize: 16, marginBottom: 8, color: '#555' },
});