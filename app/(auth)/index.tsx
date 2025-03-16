import { View, Text, Image } from 'react-native';
import styles from "../../assets/styles/login.style"
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constants/colors';

export default function Login() {
  return (
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
            <View style={styles.inputContainer}>
              <Ionicons 
                name='mail-outline'
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
            </View>
          </View>
        </View>
      </View>

    </View>
  )
}