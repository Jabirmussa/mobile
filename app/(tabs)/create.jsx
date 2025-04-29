import { useState } from 'react';
import {
    KeyboardAvoidingView, 
    Platform, ScrollView, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity,
    Alert,
    Image,
    ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styles from "../../assets/styles/create.style"
import COLORS from '../../constants/colors';
import { userAuthStore } from '../../store/authStore';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function Create() {

    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [rating, setRating] = useState(3);
    const [imageBase64, setImageBase64] = useState(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { token } = userAuthStore();

    const pickImage = async () => {
        try{
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Sorry, we need camera roll permissions to make this work!');
                    return;
                }
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: "images",
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.5,
                base64: true,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
                if(result.assets[0].base64){
                    setImageBase64(result.assets[0].base64);
                }else{
                    const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                        encoding: FileSystem.EncodingType.Base64,
                    });
                    setImageBase64(base64);
                }
            }
        }
        catch (error) {
            console.log(error);
            Alert.alert('Error', 'An error occurred while picking the image. Please try again.');
        }
    }
    const handleSubmit = async () => {
        if (!title || !caption || !imageBase64 || !rating) {
            Alert.alert('Error', 'Please fill in all fields and select an image.');
            return;
        }
    
        try {
            setLoading(true);
            const uriParts = image.split('.');
            const fileType = uriParts[uriParts.length - 1];
            const imageType = fileType ? `image/${fileType.toLowerCase()}` : 'image/jpeg';
    
            const imageDataUrl = `data:${imageType};base64,${imageBase64}`;
            const response = await fetch('https://backend-wii3.onrender.com/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    caption,
                    image: imageDataUrl,
                    rating: rating.toString(),
                }),
            });
    
            // ⚠️ tentar parsear o JSON só se a resposta for válida
            if (!response.ok) {
                const errorText = await response.text(); // <- tenta pegar o erro como texto
                console.log('Server error response:', errorText);
                throw new Error('Server responded with an error.');
            }
    
            const data = await response.json();
    
            Alert.alert('Success', 'Book recommendation submitted successfully!');
            setTitle('');
            setCaption('');
            setImage(null);
            setImageBase64(null);
            setRating(3);
            router.push('/');
    
        } catch (error) {
            console.log('Submission error:', error.message || error);
            Alert.alert('Error', 'An error occurred while submitting the form. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    const renderRating = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push (
                <TouchableOpacity 
                    key={i} 
                    onPress={() => setRating(i)}
                    style={styles.starButton}
                >   
                    <Ionicons
                        name={i <= rating ? "star" : "star-outline"} 
                        size={25} 
                        color={i <= rating ? "#f4b400": COLORS.textSecondary} 
                    />
                </TouchableOpacity>
            )
        }
        return <View style={styles.ratingContainer}>{stars}</View>
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.container} style={styles.scrollViewStyle}
            >
                <View style={styles.card}>
                    {/* HEADER */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Add Book Recomendation</Text>
                        <Text style={styles.subtitle}>Share your favorite reads with others</Text>
                    </View>

                    <View style={styles.form}> 
                        {/* Book title */}
                        <Text style={styles.label}>Title</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons 
                                name="book-outline" 
                                size={20} 
                                color={COLORS.textSecondary} 
                                style={styles.inputIcon} 
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter book title"
                                placeholderTextColor={COLORS.placeholderText}
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>
                        {/* Rating */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Your Rating</Text>
                                {renderRating()}
                        </View>
                        {/* Book cover image */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Book Image</Text>
                            <TouchableOpacity 
                                style={styles.imagePicker} 
                                onPress={pickImage}
                            >
                                {image ? (
                                    <Image 
                                        source={{ uri: image }} 
                                        style={styles.previewImage}
                                    />
                                ) : (
                                    <View style={styles.placeholderContainer}>
                                        <Ionicons 
                                            name="image-outline" 
                                            size={40} 
                                            color={COLORS.textSecondary} 
                                        />
                                        <Text style={styles.placeholderText}>Tap to select image</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                        {/* Book caption */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Caption</Text>
                            <TextInput
                                style={styles.textArea}
                                placeholder="Write your review or thoughts about this book..."
                                placeholderTextColor={COLORS.placeholderText}
                                value={caption}
                                onChangeText={setCaption}
                                multiline
                            />
                        </View>
                        {/* Submit button */}
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color={COLORS.white} />
                            ) : (
                                <>
                                    <Ionicons 
                                        name="cloud-upload-outline" 
                                        size={20} 
                                        color={COLORS.white} 
                                        style={styles.buttonIcon} 
                                    />
                                    <Text style={styles.buttonText}>Share</Text>
                                </>
                            )}

                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}