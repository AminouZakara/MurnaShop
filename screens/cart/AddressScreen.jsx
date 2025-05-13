import { ActivityIndicator, Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DifferentAddress from './DifferentAddress'
import Ionicons from '@expo/vector-icons/Ionicons';
import { firebase } from '@react-native-firebase/auth';
import { doc, getDoc, } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../redux/userSlice';
import Feather from '@expo/vector-icons/Feather';


const AddressScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const cartItems = route.params.cartItems;
    //console.log("parmas", cartItems, grandTotal, shippingCost);
    console.log("Cart items", route.params.cartItems);

    const [switchValue, setSwitchValue] = useState(false);
    {/**

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
            const userRef = doc(db, "murnaShoppingUsers", auth.currentUser.uid);
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
    console.log("User data from redux:", userData);
    */}

    //getUserData from fb
    const dispatch = useDispatch();
    const { userData, loading, error } = useSelector(state => state.user);

    // To fetch user data
    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);
    // console.log("User data from redux:", userData);
    // console.log("error getting user data from redux:", error);
    // console.log("current USer Uid:", auth.currentUser.uid);


    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        let temp = 0;
        cartItems.forEach((cartItem) => {
            temp = temp + parseInt(cartItem.price * cartItem.quantity)
        })
        setTotalAmount(temp);
        // console.log(temp)
    }, [cartItems])

  

    // asign shipping cost 
    const [shippingCost, setShippingCost] = useState(0);
    useEffect(() => {
        if (cartItems.length == 0) {
            setShippingCost(0)
        } else if (totalAmount >= 4500) {
            setShippingCost(0)
        } else {
            setShippingCost(500)
        }
    }, [shippingCost])
    console.log("Shipping Cost:", shippingCost);


    const grandTotal = shippingCost + totalAmount

    //console.log("Shipping:", shippingCost, "ToalAmount:", totalAmount);
    console.log("GrandTotal:", grandTotal);


      //get the cart items and add userinfo to it
      const cartItemsWithUserInfo = cartItems.map((item) => {
        return {
            ...item,
            userId: userData.userId,
            userName: userData.name,
            userEmail: userData.email,
            userPhoneNumber: userData.phoneNumber,
            userRegion: userData.region,
            userCity: userData.city,
            userTown: userData.town,
            userNeighborhood: userData.neighborhood,
            shippingCost: shippingCost,
        };
    });
    console.log("cartItemsWithUserInfo", cartItemsWithUserInfo);
    //handleAddress
    const handleAddress = () => {
        if (userData.phoneNumber === "") {
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
       
        } else  if (userData.region === "") {
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
        } else {
            navigation.navigate("CheckoutScreen", {
                userData: userData,
                cartItems: cartItemsWithUserInfo,
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
                            backgroundColor: "green", height: switchValue ? "12%" : "18%",
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


                                            {userData?.phoneNumber ? (
                                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                    <Text style={{ marginBottom: 8, color: "grey", }}>Numéro de téléphone:   </Text>
                                                    <Text style={{ color: "black", fontWeight: "400", fontSize: 16 }}>{userData?.phoneNumber}</Text>
                                                </View>

                                            ) : (<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                <Text style={{ marginBottom: 8, color: "grey", }}>Numéro de téléphone:  <Text style={{ color: "black", fontWeight: "400", fontSize: 16 }}>{userData?.phoneNumber}</Text> </Text>
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate("EditProfile")}
                                                    style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <Text style={{ marginRight: 10, color: "green", fontSize: 16, marginLeft: 5 }}>Ajouter</Text>
                                                    <Feather name="phone-call" size={20} color="green" />
                                                </TouchableOpacity>
                                            </View>)}

                                            {userData?.region ? (
                                                <View>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                        <Text style={{ marginTop: 10, color: "grey", fontSize: 16 }}>Adresse </Text>
                                                        <Text style={{ marginTop: 5, color: "black", fontWeight: "600", fontSize: 18 }}>{userData?.region}</Text>
                                                    </View>
                                                    <View style={{ borderBottomWidth: 0.5, borderColor: "grey" }} />
                                                    <Text style={{ marginTop: 10, fontSize: 16, fontStyle: "italic" }}>{userData?.city}, {userData?.town}, {userData?.neighborhood} </Text>
                                                </View>
                                            ) : (
                                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                    <Text style={{ marginTop: 10, color: "grey", fontSize: 16 }}>Adresse </Text>
                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate("EditProfile")}
                                                        style={{ flexDirection: "row", alignItems: "center" }}>
                                                        <Text style={{ marginRight: 10, color: "green", fontSize: 16, marginLeft: 5 }}>Ajouter</Text>
                                                        <Feather name="map-pin" size={20} color="green" />
                                                    </TouchableOpacity>
                                                </View>)}




                                        </View>

                                        <TouchableOpacity
                                            onPress={handleAddress}
                                            style={{
                                                marginTop: 60, justifyContent: "flex-start", alignItems: "center",
                                            }} >
                                            <View style={{ width: "100%", backgroundColor: "green", borderRadius: 10, padding: 10 }} >
                                                <Text style={{ color: "white", fontSize: 18, textAlign: "center" }} >Continuer</Text>
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