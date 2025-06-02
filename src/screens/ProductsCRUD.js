import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert, StyleSheet, Modal } from 'react-native';

export default function ProductsCRUD() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [img, setImg] = useState('');
  const [tipo, setTipo] = useState('');
  const [editId, setEditId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' | 'edit' | 'delete'
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cargar productos al iniciar
  const fetchProductos = () => {
    fetch('http://192.168.1.33/ProyectoDPS_final/src/api/get_productos.php')
      .then(res => res.json())
      .then(data => {
        if (data.success) setProductos(data.data);
      });
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // Abrir modal para agregar
  const openAddModal = () => {
    setNombre('');
    setPrecio('');
    setDescripcion('');
    setImg('');
    setTipo('');
    setEditId(null);
    setModalType('add');
    setModalVisible(true);
  };

  // Abrir modal para editar
  const openEditModal = (producto) => {
    setNombre(producto.nombre);
    setPrecio(String(producto.precio));
    setDescripcion(producto.descripcion);
    setImg(producto.img);
    setTipo(producto.tipo);
    setEditId(producto.id);
    setModalType('edit');
    setModalVisible(true);
  };

  // Abrir modal para eliminar
  const openDeleteModal = (producto) => {
    setSelectedProduct(producto);
    setModalType('delete');
    setModalVisible(true);
  };

  // Guardar (agregar o editar)
  const handleSave = async () => {
    if (!nombre || !precio || !descripcion || !img || !tipo) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    const url = editId
      ? 'http://192.168.1.33/ProyectoDPS_final/src/api/update_producto.php'
      : 'http://192.168.1.33/ProyectoDPS_final/src/api/add_producto.php';
    const body = editId
      ? { id: editId, nombre, precio, descripcion, img, tipo }
      : { nombre, precio, descripcion, img, tipo };
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.success) {
      Alert.alert('Éxito', editId ? 'Producto actualizado' : 'Producto agregado');
      setModalVisible(false);
      fetchProductos();
    } else {
      Alert.alert('Error', data.message || 'Ocurrió un error');
    }
  };

  // Eliminar producto
  const handleDelete = async () => {
    const res = await fetch('http://192.168.1.33/ProyectoDPS_final/src/api/delete_producto.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selectedProduct.id }),
    });
    const data = await res.json();
    if (data.success) {
      Alert.alert('Eliminado', 'Producto eliminado');
      setModalVisible(false);
      fetchProductos();
    } else {
      Alert.alert('Error', data.message || 'No se pudo eliminar');
    }
  };

  // Renderiza cada producto
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.itemName}>{item.nombre}</Text>
        <Text style={styles.itemPrice}>${item.precio}</Text>
        <Text style={styles.itemDesc}>Tipo: {item.tipo}</Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity style={styles.editBtn} onPress={() => openEditModal(item)}>
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => openDeleteModal(item)}>
          <Text style={styles.actionText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Productos</Text>
      <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
        <Text style={styles.addButtonText}>+ Agregar Producto</Text>
      </TouchableOpacity>
      <FlatList
        data={productos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 30, color: '#888' }}>No hay productos</Text>}
      />

      {/* Modal para agregar/editar/eliminar */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {modalType === 'delete' ? (
              <>
                <Text style={styles.modalTitle}>¿Eliminar producto?</Text>
                <Text style={{ marginBottom: 20 }}>{selectedProduct?.nombre}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                  <TouchableOpacity style={[styles.button, { backgroundColor: '#dc3545', flex: 1, marginRight: 8 }]} onPress={handleDelete}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, { backgroundColor: '#aaa', flex: 1 }]} onPress={() => setModalVisible(false)}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>{modalType === 'add' ? 'Agregar Producto' : 'Editar Producto'}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre"
                  value={nombre}
                  onChangeText={setNombre}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Precio"
                  value={precio}
                  onChangeText={setPrecio}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Descripción"
                  value={descripcion}
                  onChangeText={setDescripcion}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Tipo"
                  value={tipo}
                  onChangeText={setTipo}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                  <TouchableOpacity style={[styles.button, { flex: 1, marginRight: 8 }]} onPress={handleSave}>
                    <Text style={styles.buttonText}>{modalType === 'add' ? 'Agregar' : 'Actualizar'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, { backgroundColor: '#aaa', flex: 1 }]} onPress={() => setModalVisible(false)}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f6fb' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 18, color: '#007bff', textAlign: 'center' },
  addButton: { backgroundColor: '#28a745', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 18 },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  item: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
  itemName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  itemPrice: { fontSize: 16, color: '#007bff', marginTop: 2 },
  itemDesc: { fontSize: 14, color: '#555', marginTop: 2 },
  itemActions: { flexDirection: 'row' },
  editBtn: { backgroundColor: '#ffc107', padding: 8, borderRadius: 6, marginRight: 8 },
  deleteBtn: { backgroundColor: '#dc3545', padding: 8, borderRadius: 6 },
  actionText: { color: '#fff', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 16, padding: 24, width: '90%', alignItems: 'center' },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#007bff' },
  input: { backgroundColor: '#f1f1f1', padding: 12, borderRadius: 8, marginBottom: 12, width: '100%', fontSize: 16 },
  button: { backgroundColor: '#007bff', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});