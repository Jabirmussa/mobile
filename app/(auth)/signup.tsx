import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../../assets/styles/signup.style"
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import { Link } from "expo-router";

export default function signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = () =>{};
  return (
    <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Marrar📚</Text>
                        <Text style={styles.subtitle}>Partilhe seus livros favoritos</Text>
                    </View>

                    <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Username</Text>
                        {/*Email*/}
                        <View style={styles.inputContainer}>
                            <Ionicons 
                                name='person-outline'
                                size={20}
                                color={COLORS.primary}
                                style={styles.inputIcon}
                            />
                            <TextInput 
                                style={styles.input} 
                                placeholder='John Doe'
                                placeholderTextColor={COLORS.placeholderText}
                                value={username}
                                onChangeText={setEmail}
                                autoCapitalize='none'
                            />
                        </View>
                        <Text style={styles.label}>Email</Text>
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
                                <Text style={styles.buttonText}>Registar</Text>
                            )}
                        </TouchableOpacity>
                         {/*Footer*/}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Ja tem uma conta?</Text>
                            <Link href="/(auth)" asChild>
                                <TouchableOpacity>
                                <Text style={styles.link}>Login</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </KeyboardAvoidingView>
  )}
