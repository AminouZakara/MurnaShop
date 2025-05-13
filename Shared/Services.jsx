import AsyncStorage from "@react-native-async-storage/async-storage"


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


export default { setAuthUser, getAuthUser, removeAuthUser, resetTheApp }