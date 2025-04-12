import { ActivityIndicator, Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DifferentAddress from './DifferentAddress'
import Ionicons from '@expo/vector-icons/Ionicons';
import { firebase } from '@react-native-firebase/auth';
import { doc, getDoc, } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigation, useRoute } from '@react-navigation/native';


const AddressScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const cartItems = route.params.cartItems;
    const grandTotal = route.params.grandTotal;
    const shippingCost = route.params.shippingCost;
    //console.log("parmas", cartItems, grandTotal, shippingCost);

    const [switchValue, setSwitchValue] = useState(false);
    const [loading, setLoading] = useState(true);
    //console.log("currentUserUid", currentUserUid);


    //getUserData from fb
    useEffect(() => {
        getUserData();
    }, [])
    const [userData, setUserData] = useState([]);
    const getUserData = async () => {
        setLoading(true)
        try {
            const userRef = doc(db, "murnaShoppingUsers", currentUserUid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                setUserData(docSnap.data());
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    //handleAddress
    const handleAddress = () => {
        if (userData.region === "") {
            Alert.alert(
                "Addresse",
                "S'il vous plaît ajouter une adresse",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate("EditProfile", {
                            userData: userData
                        }),
                    },
                ],

            )
        } else if (userData.phoneNumber === "") {
            Alert.alert(
                "Numéro de téléphone",
                "S'il vous plaît ajouter un numéro de téléphone",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate("EditProfile", {
                            userData: userData
                        }),
                    },
                ],
            )
        } else {
            navigation.navigate("CheckoutScreen", {
                userData: userData,
                cartItems: cartItems,
                grandTotal: grandTotal,
                shippingCost: shippingCost
            })
            console.log("userData name:", userData?.name);
            console.log("userData phoneNumber:", userData?.phoneNumber);
            console.log("region:", userData?.region);
            console.log("city:", userData?.city);
            console.log("town:", userData?.town);
            console.log("neighborhood:", userData?.neighborhood);
        }
    }

    return (
        <View style={styles.container}>
            {
                loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{
                                justifyContent: "space-between",
                                flexDirection: 'row',
                                marginBottom: 20,
                                backgroundColor: "green", height: "12%",
                                alignItems: "center",
                            }}>
                                <Ionicons style={{}} name="location-outline" size={50} color="#ff9900" />
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{ color: "lightgrey", fontSize: 12 }}>Envoyer à une autre adresse</Text>
                                    <Switch
                                        value={switchValue}
                                        onValueChange={() => setSwitchValue(!switchValue)}
                                    />
                                </View>

                            </View>
                            {/* Address Container */}
                            <View style={styles.addressContainer}>
                                {/* if switch is true then show the address else show the add address button */}
                                {
                                    switchValue ? (
                                        <View style={{ paddingHorizontal: 4 }}>
                                            <DifferentAddress userId={userData?.userId} cartItems={cartItems} grandTotal={grandTotal} shippingCost={shippingCost} />
                                        </View>

                                    ) : (
                                        <View>
                                            <View style={{ paddingHorizontal: 4 }}>
                                                <Text style={{ color: "green", marginBottom: 8 }}>Mes informations de livraison</Text>
                                                <Text style={{ marginBottom: 8, color: "grey", }}>Nom prénom: <Text style={{ color: "black", fontWeight: "400", fontSize: 16 }}>{userData?.name}</Text> </Text>
                                                <Text style={{ marginBottom: 8, color: "grey", }}>Numéro de téléphone: <Text style={{ color: "black", fontWeight: "400", fontSize: 16 }}>{userData?.phoneNumber}</Text> </Text>

                                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                    <Text style={{ marginTop: 10, color: "grey", fontSize: 16 }}>Adresse </Text>
                                                    <Text style={{ color: "black", fontWeight: "600", fontSize: 16 }}>{userData?.region}</Text>
                                                </View>
                                                <View style={{ borderBottomWidth: 0.5, borderColor: "grey" }} />
                                                <Text style={{ marginTop: 10, fontSize: 16, fontStyle: "italic" }}>{userData?.city}, {userData?.town}, {userData?.neighborhood} </Text>


                                            </View>

                                            <TouchableOpacity
                                                onPress={handleAddress}
                                                style={{
                                                    marginTop: 60, justifyContent: "flex-start", alignItems: "center",
                                                }} >
                                                <View style={{ width: "100%", backgroundColor: "green", borderRadius: 10, padding: 10 }} >
                                                    <Text style={{ color: "white", fontSize: 18, textAlign: "center" }} >Confirmer</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    )

                                }

                            </View>

                            {/* Address Container */}
                        </ScrollView>
                )
            }


        </View>
    )
}

export default AddressScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    addressContainer: {
        marginTop: 20

    }
})