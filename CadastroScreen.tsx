import React, { useState } from 'react';
import { TextInput, Button, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { MaskedTextInput } from 'react-native-mask-text';
import { getAuth, createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { getFirestore, doc, setDoc, query, where, collection, getDocs } from 'firebase/firestore';

const db = getFirestore();
const auth = getAuth();

export default function CadastroScreen({ navigation }: any) {
  const { control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCompleteRegistration = async (data: any) => {
    setLoading(true);
    setError('');

    try {
      const { email, password, fullName, birthDate, address, phone, emergencyPhone, username } = data;

      // Verifica se o username já existe
      const q = query(collection(db, 'users'), where('username', '==', username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setError('Este nome de usuário já está em uso. Tente outro.');
        setLoading(false);
        return;
      }

      // Criação do usuário no Firebase Auth
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Salvar os dados adicionais no Firestore
      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        birthDate,
        address,
        phone,
        emergencyPhone,
        username,
      });

      navigation.replace('Home');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Este email já está registrado. Tente outro email.');
      } else {
        setError('Erro ao cadastrar usuário: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (email: string) => {
    if (error) {
      setError('');
      clearErrors();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Complete seu Cadastro</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Email */}
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email é obrigatório',
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Email inválido',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={value}
            onChangeText={(email) => {
              handleEmailChange(email);
              onChange(email);
            }}
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{String(errors.email?.message)}</Text>}

      {/* Senha */}
      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Senha é obrigatória',
          minLength: { value: 6, message: 'Senha deve ter pelo menos 6 caracteres' },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{String(errors.password?.message)}</Text>}

      {/* Nome Completo */}
      <Controller
        control={control}
        name="fullName"
        rules={{ required: 'Nome Completo é obrigatório' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.fullName && <Text style={styles.error}>{String(errors.fullName?.message)}</Text>}

      {/* Username */}
      <Controller
        control={control}
        name="username"
        rules={{
          required: 'Username é obrigatório',
          minLength: { value: 3, message: 'Mínimo de 3 caracteres' },
          maxLength: { value: 15, message: 'Máximo de 15 caracteres' },
          pattern: {
            value: /^[a-z0-9._]+$/,
            message: 'Use apenas letras minúsculas, números, ponto ou underline',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Nome de usuário (ex: leoalvesjf)"
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
          />
        )}
      />
      {errors.username && <Text style={styles.error}>{String(errors.username?.message)}</Text>}

      {/* Data de nascimento */}
      <Controller
        control={control}
        name="birthDate"
        rules={{ required: 'Data de Nascimento é obrigatória' }}
        render={({ field: { onChange, value } }) => (
          <MaskedTextInput
            mask="99/99/9999"
            value={value}
            onChangeText={onChange}
            style={styles.input}
            placeholder="Data de Nascimento"
          />
        )}
      />
      {errors.birthDate && <Text style={styles.error}>{String(errors.birthDate?.message)}</Text>}

      {/* Endereço */}
      <Controller
        control={control}
        name="address"
        rules={{ required: 'Endereço é obrigatório' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Endereço"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.address && <Text style={styles.error}>{String(errors.address?.message)}</Text>}

      {/* Telefone */}
      <Controller
        control={control}
        name="phone"
        rules={{ required: 'Telefone é obrigatório' }}
        render={({ field: { onChange, value } }) => (
          <MaskedTextInput
            mask="(99) 9 9999-9999"
            value={value}
            onChangeText={onChange}
            style={styles.input}
            placeholder="Telefone"
          />
        )}
      />
      {errors.phone && <Text style={styles.error}>{String(errors.phone?.message)}</Text>}

      {/* Telefone de Emergência */}
      <Controller
        control={control}
        name="emergencyPhone"
        rules={{ required: 'Telefone de Emergência é obrigatório' }}
        render={({ field: { onChange, value } }) => (
          <MaskedTextInput
            mask="(99) 9 9999-9999"
            value={value}
            onChangeText={onChange}
            style={styles.input}
            placeholder="Telefone de Emergência"
          />
        )}
      />
      {errors.emergencyPhone && <Text style={styles.error}>{String(errors.emergencyPhone?.message)}</Text>}

      <Button
        title={loading ? "Cadastrando..." : "Cadastrar"}
        onPress={handleSubmit(handleCompleteRegistration)}
        disabled={loading}
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
