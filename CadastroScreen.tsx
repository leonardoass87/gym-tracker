import React, { useState } from 'react';
import { TextInput, Button, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form'; // Importando react-hook-form
import { MaskedTextInput } from 'react-native-mask-text'; // Substituindo a lib InputMask pela mais compatível com React Native
import { getAuth } from 'firebase/auth'; // Correção: 'getAuth' para obter a instância de 'auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Importando Firestore para armazenar dados adicionais
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth'; // Importando createUserWithEmailAndPassword

const db = getFirestore();
const auth = getAuth(); // Inicializando a instância do Firebase Auth

export default function CadastroScreen({ navigation }: any) {
  const { control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // Controle de loading

  // Função para completar o cadastro
  const handleCompleteRegistration = async (data: any) => {
    setLoading(true);  // Inicia o loading
    try {
      console.log('Dados do cadastro:', data); // Verifica os dados recebidos

      const { email, password, fullName, birthDate, address, phone, emergencyPhone } = data;

      // Cria um novo usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Salva os dados adicionais no Firestore
      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        birthDate,
        address,
        phone,
        emergencyPhone,
      });

      // Redireciona automaticamente para a tela "Home"
      navigation.replace('HomeScreen'); // Usando `replace` para substituir a tela atual
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Este email já está registrado. Tente outro email.'); // Mensagem personalizada
      } else {
        setError('Erro ao cadastrar usuário: ' + error.message); // Outras mensagens de erro
      }
    } finally {
      setLoading(false);  // Finaliza o loading
    }
  };

  // Função para limpar os erros e resetar o formulário após a tentativa de correção do erro
  const handleEmailChange = (email: string) => {
    if (error) {
      setError('');  // Limpa a mensagem de erro
      clearErrors(); // Limpa erros antigos de campos, incluindo email
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Complete seu Cadastro</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Campo de Email */}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={value}
            onChangeText={(email) => {
              handleEmailChange(email); // Limpa os erros ao tentar corrigir o email
              onChange(email);
            }}
          />
        )}
        name="email"
        rules={{
          required: 'Email é obrigatório',
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Email inválido',
          },
        }}
      />
      {errors.email && <Text style={styles.error}>{String(errors.email?.message)}</Text>} 

      {/* Campo de Senha */}
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
        rules={{ 
          required: 'Senha é obrigatória', 
          minLength: { value: 6, message: 'Senha deve ter pelo menos 6 caracteres' },
        }}
      />
      {errors.password && <Text style={styles.error}>{String(errors.password?.message)}</Text>} 

      {/* Campo para Nome Completo */}
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
      {errors.fullName && <Text style={styles.error}>{String(errors.fullName?.message)}</Text>} 

      {/* Máscara para Data de Nascimento */}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <MaskedTextInput
            mask="99/99/9999" // Máscara de data DD/MM/AAAA
            value={value}
            onChangeText={onChange}
            style={styles.input}
            placeholder="Data de Nascimento"
          />
        )}
        name="birthDate"
        rules={{ required: 'Data de Nascimento é obrigatória' }}
      />
      {errors.birthDate && <Text style={styles.error}>{String(errors.birthDate?.message)}</Text>} 

      {/* Campo para Endereço */}
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
      {errors.address && <Text style={styles.error}>{String(errors.address?.message)}</Text>} 

      {/* Máscara para Telefone */}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <MaskedTextInput
            mask="(99) 9 9999-9999" // Máscara para telefone
            value={value}
            onChangeText={onChange}
            style={styles.input}
            placeholder="Telefone"
          />
        )}
        name="phone"
        rules={{ required: 'Telefone é obrigatório' }}
      />
      {errors.phone && <Text style={styles.error}>{String(errors.phone?.message)}</Text>} 

      {/* Máscara para Telefone de Emergência */}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <MaskedTextInput
            mask="(99) 9 9999-9999" // Máscara para telefone de emergência
            value={value}
            onChangeText={onChange}
            style={styles.input}
            placeholder="Telefone de Emergência"
          />
        )}
        name="emergencyPhone"
        rules={{ required: 'Telefone de Emergência é obrigatório' }}
      />
      {errors.emergencyPhone && <Text style={styles.error}>{String(errors.emergencyPhone?.message)}</Text>} 

      {/* Botão de Cadastro com Feedback */}
      <Button 
        title={loading ? "Cadastrando..." : "Cadastrar"} 
        onPress={handleSubmit(handleCompleteRegistration)} 
        disabled={loading}  // Desabilita o botão durante o carregamento
      />

      {loading && <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />}
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
  loader: {
    marginTop: 20,
  },
});
