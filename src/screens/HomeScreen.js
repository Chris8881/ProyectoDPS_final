import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert, ScrollView, Modal, Button } from 'react-native';
import { StatusBar, Platform } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('Todos');
  const [tipos, setTipos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [menuVisible, setMenuVisible] = useState(false); // Nuevo estado para el menú

  useEffect(() => {
    fetch('http://192.168.1.34/ProyectoDPS_final/src/api/get_productos.php')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProductos(data.data);
          const tiposUnicos = ['Todos', ...new Set(data.data.map(p => p.tipo))];
          setTipos(tiposUnicos);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const userId = 1;

  const handleAddToCart = async (producto, cantidadAgregar = 1) => {
    try {
      const response = await fetch('http://192.168.1.34/ProyectoDPS_final/src/api/add_to_cart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          productId: producto.id,
          quantity: cantidadAgregar,
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

  const openProductModal = (producto) => {
    setSelectedProduct(producto);
    setCantidad(1);
    setModalVisible(true);
  };

  const handleProfile = () => {
    setMenuVisible(false);
    navigation.navigate('Profile');
  };

  const handleLogout = () => {
    setMenuVisible(false);
    navigation.replace('Login');
  };

  const productosFiltrados = filtro === 'Todos'
    ? productos
    : productos.filter(p => p.tipo === filtro);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openProductModal(item)}>
      <View style={styles.card}>
        <Image source={{ uri: item.img }} style={styles.image} />
        <Text style={styles.name}>{item.nombre}</Text>
        <Text style={styles.price}>${item.precio}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ferreteria Willy</Text>
        <View>
          <TouchableOpacity style={styles.menuIcon} onPress={() => setMenuVisible(!menuVisible)}>
            <Text style={{ fontSize: 22, color: '#fff' }}>☰</Text>
          </TouchableOpacity>
          {menuVisible && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity onPress={handleProfile} style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>👤 Ver perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout} style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>🚪 Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
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

      {/* Modal de producto */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedProduct && (
              <>
                <Text style={styles.name}>{selectedProduct.nombre}</Text>
                <Image source={{ uri: selectedProduct.img }} style={styles.image} />
                <Text style={styles.description}>{selectedProduct.descripcion}</Text>
                <Text style={styles.price}>${selectedProduct.precio}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                  <TouchableOpacity onPress={() => setCantidad(Math.max(1, cantidad - 1))} style={styles.qtyButton}>
                    <Text style={{ fontSize: 20 }}>-</Text>
                  </TouchableOpacity>
                  <Text style={{ marginHorizontal: 16, fontSize: 18 }}>{cantidad}</Text>
                  <TouchableOpacity onPress={() => setCantidad(cantidad + 1)} style={styles.qtyButton}>
                    <Text style={{ fontSize: 20 }}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={async () => {
                    await handleAddToCart(selectedProduct, cantidad);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.buttonText}>Agregar {cantidad} al carrito</Text>
                </TouchableOpacity>
                <Button title="Cerrar" onPress={() => setModalVisible(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>
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
  menuIcon: { backgroundColor: '#0056b3', padding: 8, borderRadius: 20, marginRight: 8 },
  dropdownMenu: {
    position: 'absolute',
    top: 45,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    paddingVertical: 8,
    minWidth: 150,
    zIndex: 100,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
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
  description: { fontSize: 16, color: '#555', marginBottom: 8, textAlign: 'center' },
  price: { fontSize: 18, color: '#007bff', marginBottom: 8 },
  button: {
    backgroundColor: '#007bff',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    alignItems: 'center',
  },
  qtyButton: {
    backgroundColor: '#e0e7ff',
    padding: 8,
    borderRadius: 8,
  },
});