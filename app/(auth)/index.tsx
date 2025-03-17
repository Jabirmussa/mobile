import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import styles from "../../assets/styles/login.style"
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constants/colors';
import { useState } from 'react';
import { Link } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {};

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.topIllustration}>
            <Image
              source={require('../../assets/images/login.png')}
              style={styles.illustrationImage}
              resizeMode='contain'
            />
        </View>

        <View style={styles.card}>
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>

              <Text style={styles.label}>Email</Text>
              {/*Email*/}
              <View style={styles.inputContainer}>
                <Ionicons 
                  name='mail-outline'
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput 
                  style={styles.input} 
                  placeholder='Digite o seu email'
                  placeholderTextColor={COLORS.placeholderText}
                  value=''
                  onChangeText={setEmail}
                  keyboardType='email-address'
                  autoCapitalize='none'
                />
              </View>

              {/*Password*/}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputContainer}>
                    <Ionicons 
                      name='lock-closed-outline'
                      size={20}
                      color={COLORS.primary}
                      style={styles.inputIcon}
                    />
                    <TextInput 
                      style={styles.input} 
                      placeholder='Digite o seu password'
                      placeholderTextColor={COLORS.placeholderText}
                      value=''
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIcon}
                    >
                      <Ionicons 
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color={COLORS.primary}
                      />
                    </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.button} disabled={isLoading}>
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Login</Text>
                  )}
              </TouchableOpacity>

              {/*Footer*/}
              <View style={styles.footer}>
                  <Text style={styles.footerText}>Nao tem uma conta?</Text>
                  <Link href="/signup" asChild>
                    <TouchableOpacity>
                      <Text style={styles.link}>Sign Up</Text>
                    </TouchableOpacity>
                  </Link>
              </View>
            </View>
          </View>
        </View>

      </View>
    </KeyboardAvoidingView>
  )
}