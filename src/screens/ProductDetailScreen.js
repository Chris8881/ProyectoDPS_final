import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Picker, Button, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function ProductDetailScreen() {
  const route = useRoute();
  const { id } = route.params;
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    fetch(`http://192.168.1.34/FerreteriaWillyApp/src/api/get_producto.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setProducto(data.data);
        else Alert.alert('Error', 'Producto no encontrado');
      })
      .catch(() => Alert.alert('Error', 'No se pudo cargar el producto'));
  }, []);

  const handleAgregarCarrito = () => {
    // Aquí podrías guardar en AsyncStorage o enviar a una API
    Alert.alert('Agregado', `Se agregó ${cantidad} unidad(es) de ${producto.nombre}`);
  };

  if (!producto) return <Text>Cargando producto...</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: producto.img }} style={styles.image} />
      <Text style={styles.title}>{producto.nombre}</Text>
      <Text style={styles.desc}>{producto.descripcion}</Text>
      <Text style={styles.price}>${producto.precio}</Text>

      <Text>Cantidad:</Text>
      <Picker
        selectedValue={cantidad}
        style={styles.picker}
        onValueChange={(value) => setCantidad(value)}
      >
        {[...Array(10).keys()].map(i => (
          <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
        ))}
      </Picker>

      <Button title="Añadir al carrito" onPress={handleAgregarCarrito} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  image: { width: '100%', height: 200, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  desc: { fontSize: 16, marginBottom: 10 },
  price: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  picker: { height: 50, width: 150 },
});
