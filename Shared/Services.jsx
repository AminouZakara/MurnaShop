import AsyncStorage from "@react-native-async-storage/async-storage"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"


export const getUserRole = async (uid) => {
    try {
        const userDoc = await getDoc(doc(db, 'murnaShoppingUsers', uid));
        if (userDoc.exists()) {
            return userDoc.data().role;
        }
        return null;
    } catch (error) {
        console.log('Error fetching user role:', error);
        return null;
    }
};

const setAuthUser = async (value) => {
    try {
        await AsyncStorage.setItem('userData', JSON.stringify(value))
    } catch (error) {
        console.log(error)
    }
}

const getAuthUser = async () => {
    try {
        const value = await AsyncStorage.getItem('userData')
        if (value !== null) {
            return JSON.parse(value)
        }
    } catch (error) {
        console.log(error)
    }
}
const removeAuthUser = async () => {
    try {
        await AsyncStorage.removeItem('userData')
    } catch (error) {
        console.log(error)
    }
}

const resetTheApp = async () => {
    try {
        await AsyncStorage.clear()
    } catch (error) {
        console.log(error)
    }
}


export default {getUserRole, setAuthUser, getAuthUser, removeAuthUser, resetTheApp }