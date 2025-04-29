import {Text, View, TouchableOpacity} from 'react-native';
import { userAuthStore } from '../../store/authStore';

export default function Tabs() {
    const { logout } = userAuthStore();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home tabs</Text>
            <TouchableOpacity onPress={() => logout()}>
                <Text>Log out</Text>
            </TouchableOpacity>
        </View>
    );
}