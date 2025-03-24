import React, { useState } from 'react';
import { TextInput, Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form'; // Importando react-hook-form
import InputMask from 'react-input-mask'; // Para aplicar a máscara no campo de celular
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig'; // Importando o auth do Firebase

export default function CadastroScreen({ navigation }: any) {
  const { control, handleSubmit, setValue, getValues } = useForm();
  const [error, setError] = useState('');

  // Função de cadastro
  const handleSignup = async (data: any) => {
    try {
      const { email, password, fullName, birthDate, address, phone, emergencyPhone } = data;
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Cadastro bem-sucedido!');
      // Você pode redirecionar o usuário para a Home ou outra página após o cadastro
      navigation.navigate('Home');
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cadastro</Text>
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

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Data de Nascimento (DD/MM/AAAA)"
            value={value}
            onChangeText={onChange}
          />
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

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputMask
            mask="(99) 9 9999-9999"
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

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputMask
            mask="(99) 9 9999-9999"
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

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={value}
            onChangeText={onChange}
          />
        )}
        name="email"
        rules={{ required: 'Email é obrigatório' }}
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
        name="password"
        rules={{ required: 'Senha é obrigatória' }}
      />

      <Button title="Cadastrar" onPress={handleSubmit(handleSignup)} />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.switchText}>Já tem uma conta? Faça login</Text>
      </TouchableOpacity>
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
