import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const auth = getAuth();
const db = getFirestore();

const EditarPerfilScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    phone: '',
    emergencyPhone: '',
    address: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setForm({
            fullName: data.fullName || '',
            username: data.username || '',
            phone: data.phone || '',
            emergencyPhone: data.emergencyPhone || '',
            address: data.address || '',
          });
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSave = async () => {
    if (!form.username || form.username.length < 3) {
      Alert.alert('Erro', 'Username deve ter pelo menos 3 caracteres');
      return;
    }

    try {
      setSaving(true);
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, form);
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        navigation.goBack(); // volta para a tela anterior após salvar
      }
    } catch (error) {
      console.log('Erro ao salvar perfil:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Editar Perfil</Text>

        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          style={styles.input}
          value={form.fullName}
          onChangeText={(text) => handleChange('fullName', text)}
        />

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={form.username}
          onChangeText={(text) => handleChange('username', text)}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          value={form.phone}
          onChangeText={(text) => handleChange('phone', text)}
        />

        <Text style={styles.label}>Telefone de emergência</Text>
        <TextInput
          style={styles.input}
          value={form.emergencyPhone}
          onChangeText={(text) => handleChange('emergencyPhone', text)}
        />

        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={styles.input}
          value={form.address}
          onChangeText={(text) => handleChange('address', text)}
        />

        <Button
          title={saving ? 'Salvando...' : 'Salvar'}
          onPress={handleSave}
          disabled={saving}
        />

        <View style={{ marginTop: 15 }}>
          <Button
            title="Cancelar"
            onPress={() => navigation.goBack()}
            color={Platform.OS === 'web' ? '#888' : '#aaa'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: Platform.OS === 'web' ? 'center' : 'flex-start',
    alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
    padding: 20,
  },
  form: {
    width: Platform.OS === 'web' ? 420 : '100%',
    backgroundColor: Platform.OS === 'web' ? '#fff' : 'transparent',
    padding: Platform.OS === 'web' ? 25 : 0,
    borderRadius: Platform.OS === 'web' ? 10 : 0,
    shadowColor: Platform.OS === 'web' ? '#000' : undefined,
    shadowOffset: Platform.OS === 'web' ? { width: 0, height: 4 } : undefined,
    shadowOpacity: Platform.OS === 'web' ? 0.1 : undefined,
    shadowRadius: Platform.OS === 'web' ? 6 : undefined,
    elevation: Platform.OS === 'web' ? 5 : 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});

export default EditarPerfilScreen;
