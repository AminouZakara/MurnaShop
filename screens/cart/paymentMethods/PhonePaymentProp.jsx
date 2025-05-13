import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Switch, Alert, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; // Adjust the path to your firebaseConfig file
import { clearCart } from "../../../redux/cartSlice";
import { useDispatch } from "react-redux";
import LoadingModal from "../../../components/cart/LoadingModal";

const PhonePaymentProp = ({ methodName, color, userData, cartItems, grandTotal, shippingCost }) => {
    console.log("PhonePro userData", userData.photoURL);
    //console.log("PhonePro cartItems", cartItems);
    //console.log("PhonePro grandTotal", grandTotal);
    const dispatch = useDispatch();
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


    const [isChecking, setIsChecking] = useState(false);
    const [showRetry, setShowRetry] = useState(false);

    const groupItemsByStore = (items) => {
        const grouped = {};
        items.forEach(item => {
            const storeId = item.storeId;
            if (!grouped[storeId]) {
                grouped[storeId] = [];
            }
            grouped[storeId].push(item);
        });
        return grouped;
    };

    const createOrdersPerStore = async () => {
        setIsChecking(true);
        setShowRetry(false);

        // Timeout in case something hangs
        const timeoutId = setTimeout(() => {
            setIsChecking(false);
            setShowRetry(true);
        }, 15000); // 15 seconds

        setUserInforError({ name: "", surname: "", phone: "" });
        const errors = { name: "", surname: "", phone: "" };

        if (!userInfo.name) errors.name = "Veuillez entrer votre nom";
        if (!userInfo.surname) errors.surname = "Veuillez entrer votre prénom";
        if (!userInfo.phone) errors.phone = "Veuillez entrer votre numéro de téléphone";

        setUserInforError(errors);

        if (errors.name || errors.surname || errors.phone) {
            clearTimeout(timeoutId);
            setIsChecking(false);
            return;
        }

        if (saveInfo) {
            await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        }

        try {
            const groupedByStore = groupItemsByStore(cartItems);
            const checkoutBatchId = Date.now().toString();

            const orderPromises = Object.entries(groupedByStore).map(async ([storeId, items]) => {
                const total = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

                // Get the first image from the store's items (or any image you prefer)
                const productImages = items[0].images; // Assuming the first image in `images` is the main one
                const productImage = productImages && productImages.length > 0 ? productImages[0] : ''; // fallback to empty string if no image

                const orderDoc = {
                    storeId,
                    userId: items[0].userId,
                    userImage: userData.photoURL,
                    orderDate: new Date(),
                    orderPaymentInfo: {
                        name: userInfo.name,
                        surname: userInfo.surname,
                        phone: userInfo.phone,
                    },
                    status: "pending",
                    paymentMethod: methodName || "CashOnDelivery",
                    checkoutBatchId,
                    cartItems: items,
                    totalAmount: total,
                    grandTotal,
                    shippingCost,
                    productImage, // Add product image to order document,
                    
                };

                return addDoc(collection(db, 'murnaShoppingOrders'), orderDoc);
            });

            await Promise.all(orderPromises);
            clearTimeout(timeoutId); // Stop timeout
            dispatch(clearCart());
            await AsyncStorage.removeItem('cart');
            setIsChecking(false);

            Alert.alert(
                "Votre paiement a été effectué avec succès",
                "Merci de votre confiance !",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Main' }],
                            });
                        },
                    },
                ]
            );
        } catch (err) {
            console.error(err);
            clearTimeout(timeoutId);
            Alert.alert("Erreur", "Une erreur est survenue.");
            setShowRetry(true);
            setIsChecking(false);
        }
    };

    const handleCheckout = async () => {

        setIsChecking(true);
        setUserInforError({ name: "", surname: "", phone: "" });
        const errors = { name: "", surname: "", phone: "" };
        if (!userInfo.name) {
            errors.name = "Veuillez entrer votre nom";
        }
        if (!userInfo.surname) {
            errors.surname = "Veuillez entrer votre prénom";
        }
        if (!userInfo.phone) {
            errors.phone = "Veuillez entrer votre numéro de téléphone";
        }
        setUserInforError(errors);
        if (errors.name || errors.surname || errors.phone) {
            setIsChecking(false);
            return;
        }
        if (saveInfo) {
            await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        }
        const orderData = {
            cartItems: cartItemsWithOrderDetails,
            grandTotal: grandTotal,
            orderPaymentMethod: methodName,
            orderPaymentInfo: userInfo,
            createdAt: new Date(),
        };
        try {
            // Save order data to Firestore or your database here
            // await addDoc(collection(db, "orders"), orderData);
            await addDoc(collection(db, "murnaShoppingOrders"), orderData);
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
            console.log("Order data saved:", orderData);
            setIsChecking(false);
        } catch (error) {
            console.error("Error saving order data:", error);
            Alert.alert("Erreur", "Une erreur s'est produite lors de la sauvegarde de votre commande.");
            setIsChecking(false);
            return;
        }
        setIsChecking(false);
        // Save user info if the switch is on
        //console.log("saveInfo", saveInfo);
        //console.log("userInfo", userInfo);
        //console.log("userInforError", userInforError);
        //console.log("cartItems", cartItems);  
        //console.log("grandTotal", grandTotal);
        //console.log("methodName", methodName);
        //console.log("color", color);
        //console.log("userData", userData);




    };
    return (
        <ScrollView style={styles.container}>
            <LoadingModal
                visible={isChecking}
                showRetry={showRetry}
                onRetry={createOrdersPerStore}
            />
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
                onPress={createOrdersPerStore}
                style={{
                    marginTop: 20, justifyContent: "flex-start", alignItems: "center",
                }} >
                <View style={{ width: "40%", backgroundColor: "green", borderRadius: 10, padding: 10 }} >
                    {isChecking ? (
                        <Text style={{ color: "white", fontSize: 18, textAlign: "center" }} > Vérification...</Text>
                    ) : (
                        <Text style={{ color: "white", fontSize: 18, textAlign: "center" }} > Confirmer </Text>
                    )}
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