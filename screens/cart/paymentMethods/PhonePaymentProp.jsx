import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Switch, Alert, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const PhonePaymentProp = ({ methodName, color }) => {
    const navigation = useNavigation();

    const [userInfo, setUserInfo] = useState({ name: "", surname: "", phone: "" });
    const [userInforError, setUserInforError] = useState({ name: "", surname: "", phone: "" });
    const [saveInfo, setSaveInfo] = useState(false);

    useEffect(() => {
        loadUserInfo();
    }, []);

    const loadUserInfo = async () => {
        try {
            const savedInfo = await AsyncStorage.getItem("userInfo");
            if (savedInfo) {
                setUserInfo(JSON.parse(savedInfo));
            }
        } catch (error) {
            console.log("Error loading user info:", error);
        }
    };

    const handleCheckout = async () => {

        if (saveInfo) {
            await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        }
        Alert.alert(
            "Votre paiement a été effectué avec succès",
            "Merci de votre confiance !",
            [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.navigate("MyOrder")
                        console.log("Payment successful");
                    },
                },
            ],
        );
    };
    return (
        <ScrollView style={styles.container}>
            <Text style={[styles.title, { color: color }]}>{methodName}</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom"
                value={userInfo.name}
                onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
            />
            {userInforError.name && <Text style={styles.error}>{userInforError.name}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Prénom"
                value={userInfo.surname}
                onChangeText={(text) => setUserInfo({ ...userInfo, surname: text })}
            />
            {userInforError.surname && <Text style={styles.error}>{userInforError.surname}</Text>}
            <TextInput
                style={styles.input}
                placeholder="96 52 32 48"
                //place an empty space after 2 digits
                keyboardType="phone-pad"
                value={userInfo.phone}
                maxLength={8}
                onChangeText={(text) => setUserInfo({ ...userInfo, phone: text })}
            />
            {userInforError.phone && <Text style={styles.error}>{userInforError.phone}</Text>}
            <View style={styles.switchContainer}>
                <Text style={{ fontSize: 11, color: "grey" }}>Enregistrer mes informations pour la prochaine commande</Text>
                <Switch value={saveInfo} onValueChange={setSaveInfo} />
            </View>

            <TouchableOpacity
                onPress={handleCheckout}
                style={{
                    marginTop: 20, justifyContent: "flex-start", alignItems: "center",
                }} >
                <View style={{ width: "40%", backgroundColor: "green", borderRadius: 10, padding: 10 }} >
                    <Text style={{ color: "white", fontSize: 18, textAlign: "center" }} > Confirmer</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default PhonePaymentProp

const styles = StyleSheet.create({
    container: { padding: 8, elevation: 0.2, },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textDecorationLine: "underline", },
    input: { marginBottom: 8, marginRight: 20, height: 40, borderColor: 'gray', borderBottomWidth: 0.2, color: "#000000", paddingHorizontal: 8, fontSize: 16, borderRadius: 5 },
    error: { color: "red", fontSize: 12, alignSelf: "center" },
    switchContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
});