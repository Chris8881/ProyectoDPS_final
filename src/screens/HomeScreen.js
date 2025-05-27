import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.34/FerreteriaWillyApp/src/api/get_productos.php')
      .then(res => res.json())
      .then(data => {
        if (data.success) setProductos(data.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos Destacados</Text>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.img }} style={styles.image} />
            <Text style={styles.name}>{item.nombre}</Text>
            <Text style={styles.price}>${item.precio}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Agregar al carrito</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  image: { width: 150, height: 150, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: '600' },
  price: { fontSize: 16, color: '#444' },
  button: {
    backgroundColor: '#007bff',
    marginTop: 10,
    padding: 8,
    borderRadius: 6,
  },
  buttonText: { color: '#fff' },
});
