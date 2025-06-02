import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image, Alert, Platform, StatusBar } from 'react-native';


export default function CartScreen({ navigation }) {
  const [cart, setCart] = useState([]);
  const userId = 1; // Cambia por el id real del usuario autenticado

  const fetchCart = async () => {
    try {
      const response = await fetch('http://192.168.1.33/ProyectoDPS_final/src/api/get_cart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (data.success) {
        setCart(data.cart);
      } else {
        setCart([]);
      }
    } catch (e) {
      console.error('Error al obtener el carrito:', e);
      setCart([]);
    }
  };

  useEffect(() => {
    fetchCart();
    const unsubscribe = navigation.addListener('focus', fetchCart);
    return unsubscribe;
  }, [navigation]);

  const handleClearCart = async () => {
    try {
      const response = await fetch('http://192.168.1.33/ProyectoDPS_final/src/api/clear_cart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (data.success) {
        setCart([]);
        Alert.alert('Carrito vaciado');
      }
    } catch (e) {
      console.error('Error al vaciar el carrito:', e);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.img }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.nombre}</Text>
        <Text>Cantidad: {item.cantidad}</Text>
        <Text>Precio: ${item.precio}</Text>
        {item.talla ? <Text>Talla: {item.talla}</Text> : null}
      </View>
    </View>
  );

  const total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
  <View style={styles.container}>
    
    <FlatList
      data={cart}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      ListEmptyComponent={<Text>El carrito está vacío.</Text>}
    />
    <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
    <Button title="Vaciar Carrito" onPress={handleClearCart} />
    <View style={{ height: 12 }} />
    <Button
      title="Finalizar compra"
      onPress={() => navigation.navigate('Checkout', { total })}
      disabled={cart.length === 0}
      color="#007bff"
    />
  </View>
);
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center', marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40 },
  item: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  image: { width: 60, height: 60, marginRight: 12, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold' },
  total: { fontSize: 20, fontWeight: 'bold', marginVertical: 16, textAlign: 'right' },
});