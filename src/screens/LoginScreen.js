import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  // Configura Google Auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '43130673176-r0in6u3hg19fikglpleccbmkt0gem1co.apps.googleusercontent.com',
    androidClientId: '43130673176-r0in6u3hg19fikglpleccbmkt0gem1co.apps.googleusercontent.com',
    webClientId: '43130673176-r0in6u3hg19fikglpleccbmkt0gem1co.apps.googleusercontent.com',
    prompt: 'select_account',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // Aquí puedes autenticarte con tu backend o Firebase usando authentication.accessToken
      // Si quieres distinguir admins por Google, deberías consultar tu backend aquí
      // Por ahora, solo navega como usuario normal
      Alert.alert('Bienvenido', 'Login con Google exitoso');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  }, [response]);

  const handleLogin = async () => {
    try {
      const res = await fetch('http://192.168.1.33/ProyectoDPS_final/src/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pass }),
      });
      const data = await res.json();
      if (data.success) {
  Alert.alert('Bienvenido', 'Login exitoso');
  if (data.user.rol === 'admin') {
    navigation.reset({
      index: 0,
      routes: [{ name: 'AdminDashboard' }],
    });
  } else {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  }
} else {
        Alert.alert('Error', data.message || 'Credenciales incorrectas');
      }
    } catch (e) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#db4437', marginTop: 10 }]}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Text style={[styles.buttonText, { color: '#fff' }]}>Ingresar con Google</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f4f6fb' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center', color: '#007bff' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 16, fontSize: 16 },
  button: { backgroundColor: '#007bff', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  link: { color: '#007bff', textAlign: 'center', marginTop: 10 },
});