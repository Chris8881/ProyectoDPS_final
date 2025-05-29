import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { StatusBar, Platform } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('Todos');
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    fetch('http://192.168.0.8/ProyectoDPS_final/src/api/get_productos.php')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProductos(data.data);
          // Extrae los tipos únicos
          const tiposUnicos = ['Todos', ...new Set(data.data.map(p => p.tipo))];
          setTipos(tiposUnicos);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const userId = 1;

  const handleAddToCart = async (producto) => {
    try {
      const response = await fetch('http://192.168.0.8/ProyectoDPS_final/src/api/add_to_cart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          productId: producto.id,
          quantity: 1,
          talla: '',
        }),
      });
      const data = await response.json();
      if (data.success) {
        Alert.alert('¡Agregado!', 'El producto se agregó al carrito.');
      } else {
        Alert.alert('Error', 'No se pudo agregar al carrito.');
      }
    } catch (e) {
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
      console.error(e);
    }
  };

  // Filtra productos según el tipo seleccionado
  const productosFiltrados = filtro === 'Todos'
    ? productos
    : productos.filter(p => p.tipo === filtro);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.img }} style={styles.image} />
      <Text style={styles.name}>{item.nombre}</Text>
      <Text style={styles.price}>${item.precio}</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(item)}>
        <Text style={styles.buttonText}>Agregar al carrito</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ferreteria Willy</Text>
        <TouchableOpacity style={styles.cartIcon} onPress={() => navigation.navigate('Cart')}>
          <Text style={{ fontSize: 22, color: '#fff' }}>🛒</Text>
        </TouchableOpacity>
      </View>
      {/* Menú de filtros */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterMenu}>
        {tipos.map(tipo => (
          <TouchableOpacity
            key={tipo}
            style={[
              styles.filterButton,
              filtro === tipo && styles.filterButtonActive
            ]}
            onPress={() => setFiltro(tipo)}
          >
            <Text style={[
              styles.filterButtonText,
              filtro === tipo && styles.filterButtonTextActive
            ]}>{tipo}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.title}>Productos Destacados</Text>
      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text>No hay productos disponibles.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fb', paddingHorizontal: 10 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 18,
    borderRadius: 14,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  headerText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  cartIcon: { backgroundColor: '#0056b3', padding: 8, borderRadius: 20 },
  filterMenu: { flexDirection: 'row', marginBottom: 10, height: 44, paddingVertical: 1, paddingHorizontal: 10 },
  filterButton: {
    backgroundColor: '#e0e7ff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#007bff',
  },
  filterButtonText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#2a2a2a' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  image: { width: 120, height: 120, marginBottom: 10, borderRadius: 10 },
  name: { fontSize: 20, fontWeight: '600', color: '#333' },
  price: { fontSize: 18, color: '#007bff', marginBottom: 8 },
  button: {
    backgroundColor: '#007bff',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});