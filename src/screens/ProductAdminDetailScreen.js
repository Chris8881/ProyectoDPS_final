import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Alert, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ProductAdminDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`http://192.168.1.33/ProyectoDPS_final/api/get_producto.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setProducto(data.data);
        else Alert.alert('Error', 'Producto no encontrado');
      })
      .catch(() => Alert.alert('Error', 'No se pudo conectar al servidor'));
  }, []);

  if (!producto) return <Text style={styles.loading}>Cargando producto...</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: producto.img }} style={styles.image} />
      <Text style={styles.title}>{producto.nombre}</Text>
      <Text style={styles.desc}>{producto.descripcion}</Text>
      <Text style={styles.price}>${producto.precio}</Text>
      <Text style={styles.tipo}>Tipo: {producto.tipo}</Text>

      <Button title="Volver al panel admin" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  image: { width: '100%', height: 200, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  desc: { fontSize: 16, marginBottom: 10 },
  price: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  tipo: { fontSize: 16, color: '#666', marginBottom: 20 },
  loading: { padding: 20, fontSize: 18 },
});
