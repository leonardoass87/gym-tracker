import React, { useState } from 'react';
import { TextInput, Button, View, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form'; // Importando react-hook-form
import InputMask from 'react-input-mask'; // Para aplicar a máscara nos campos
import { auth } from './firebase/firebaseConfig'; // Importando o auth do Firebase
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Importando Firestore para armazenar dados adicionais

const db = getFirestore();

export default function CadastroScreen({ navigation }: any) {
  const { control, handleSubmit } = useForm();
  const [error, setError] = useState('');

  // Função para completar o cadastro
  const handleCompleteRegistration = async (data: any) => {
    try {
      console.log('Dados do cadastro:', data); // Verifica os dados recebidos

      const { fullName, birthDate, address, phone, emergencyPhone } = data;
      const user = auth.currentUser; // Pega o usuário logado
      if (user) {
        // Salva os dados adicionais no Firestore
        await setDoc(doc(db, 'users', user.uid), {
          fullName,
          birthDate,
          address,
          phone,
          emergencyPhone,
        });

        alert('Cadastro complementado com sucesso!');
        navigation.navigate('Home'); // Redireciona para a tela de Home
      } else {
        setError('Usuário não encontrado.');
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Complete seu Cadastro</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            value={value}
            onChangeText={onChange}
          />
        )}
        name="fullName"
        rules={{ required: 'Nome Completo é obrigatório' }}
      />

      {/* Máscara para Data de Nascimento */}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputMask
            mask="99/99/9999" // Máscara de data DD/MM/AAAA
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          >
            {(inputProps: any) => (
              <TextInput
                {...inputProps}
                style={styles.input}
                placeholder="Data de Nascimento"
              />
            )}
          </InputMask>
        )}
        name="birthDate"
        rules={{ required: 'Data de Nascimento é obrigatória' }}
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Endereço"
            value={value}
            onChangeText={onChange}
          />
        )}
        name="address"
        rules={{ required: 'Endereço é obrigatório' }}
      />

      {/* Máscara para Telefone */}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputMask
            mask="(99) 9 9999-9999" // Máscara para telefone
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          >
            {(inputProps: any) => (
              <TextInput
                {...inputProps}
                style={styles.input}
                placeholder="Telefone"
              />
            )}
          </InputMask>
        )}
        name="phone"
        rules={{ required: 'Telefone é obrigatório' }}
      />

      {/* Máscara para Telefone de Emergência */}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputMask
            mask="(99) 9 9999-9999" // Máscara para telefone de emergência
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          >
            {(inputProps: any) => (
              <TextInput
                {...inputProps}
                style={styles.input}
                placeholder="Telefone de Emergência"
              />
            )}
          </InputMask>
        )}
        name="emergencyPhone"
        rules={{ required: 'Telefone de Emergência é obrigatório' }}
      />  

      <Button title="Cadastrar" onPress={handleSubmit(handleCompleteRegistration)} />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 15,
  },
  switchText: {
    color: '#007BFF',
    marginTop: 15,
  },
});
