import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getUserData } from '../../redux/userSlice';
import auth from '@react-native-firebase/auth'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TextInput } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { ActivityIndicator } from 'react-native';


const CargaisonScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    // To fetch user data
    const { userData, loading, error } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);

    const currentUser = auth().currentUser;
    const userId = currentUser.uid;

    console.log("current cargo user id", userId);

    const [cargaisonId, setCargaisonId] = useState("");
    const [cargaisonData, setCargaisonData] = useState(null);
    const [loadingCargaison, setLoadingCargaison] = useState(false);
    const [errorCargaison, setErrorCargaison] = useState(null);
    const [cargaisonList, setCargaisonList] = useState([]);

    // Fetch cargaison data from the server
    const fetchCargaisonData = async () => {
        if (cargaisonId === "") {
            setErrorCargaison("Veuillez entrer un ID de cargaison");
            return;
            }
        setLoadingCargaison(true);
        setErrorCargaison(null);
        
        try {
            const orderRef = doc(db, "murnaShoppingOrders", cargaisonId);
            const orderSnap = await getDoc(orderRef);
            if (orderSnap.exists()) {
                setCargaisonData({
                    ...orderSnap.data(),
                    id: orderSnap.id,
                });
                setLoadingCargaison(false);
                console.log("Cargaison data:", orderSnap.data());
            } else {
                setErrorCargaison(`Aucune cargaison trouvée avec cet ID: ${cargaisonId}`);
                setLoadingCargaison(false);
                console.log("No cargaison found with this ID");
                setCargaisonId("");
            }
        }
        catch (error) {
            setErrorCargaison("Error fetching cargaison data");
            setLoadingCargaison(false);
            console.error("Error fetching cargaison data:", error);

        }
        finally {
            setLoadingCargaison(false);
        }
    }

    console.log("cargaison data:", cargaisonData.storeName);
    console.log("cargaison data:", cargaisonData.storeCity)
    console.log("cargaison data:", cargaisonData.userCity)
    
    return (
        <View style={styles.container}>
            {
                loading ? (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 18, color: "#FF9900" }}>Loading...</Text>
                    </View>
                ) : (
                    <View style={styles.subContainer}>

                        {/* header ******** */}
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image
                                    source={require("../../assets/images/cargaison.jpg")}
                                    // source={{ uri: user.photoURL }}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 50
                                    }}
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{userData?.name}</Text>
                                    <Text style={{ fontSize: 14, color: "#FF9900" }}>{userData?.storeName}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginRight: 10 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('SupportScreen')}
                                    style={{ marginRight: 10, }}>
                                    <MaterialIcons name="support-agent" size={30} color="#FF9900" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
                                    <MaterialIcons name="settings" size={25} color="grey" />
                                </TouchableOpacity>

                            </View>
                        </View>
                        {/* header ******** */}

                        {/* search bar: search the cargo by entering the cargo id in the input * */}
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10, marginTop: 20 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#F5F5F5", borderRadius: 10, paddingHorizontal: 10, width: "80%" }}>
                                <MaterialIcons name="search" size={25} color="#FF9900" />
                                <TextInput
                                    style={{
                                        flex: 1,
                                        paddingVertical: 10,
                                    }}
                                    value={cargaisonId}
                                    onChangeText={(text) => setCargaisonId(text)}
                                    placeholder="Search by cargo id"
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => fetchCargaisonData()}
                            >
                                <MaterialIcons name="add" size={30} color="#FF9900" />
                            </TouchableOpacity>

                        </View>

                        {/** cargaison data */}
                        <View style={{marginTop: 20, paddingHorizontal: 10 }}>
                            {
                                loadingCargaison ? (
                                    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                        <ActivityIndicator size="large" color="#FF9900" />
                                        <Text style={{marginTop: 10,
                                             fontSize: 18, color: "#FF9900" }}>Rechargement...</Text>
                                    </View>
                                ) : cargaisonData ? (
                                    <View>
                                        <Text style={{ fontSize: 18, color: "#FF9900" }}>Cargaison ID: {cargaisonData.id}</Text>
                                        <Text style={{ fontSize: 18, color: "#FF9900" }}>{cargaisonData?.storeName}</Text>
                                        <Text style={{ fontSize: 18, color: "#FF9900" }}>{cargaisonData?.storeCity}</Text>
                                        <Text style={{ fontSize: 18, color: "#FF9900" }}>Status du Cargo:
                                            {cargaisonData?.status}</Text>

                                        <TouchableOpacity
                                            onPress={() => navigation.navigate("CargaisonDetails", {
                                                 cargaisonId: cargaisonId,
                                                 cargaisonData: cargaisonData
                                            })}
                                            style={{ marginTop: 20, backgroundColor: "#FF9900", padding: 10, borderRadius: 10, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                            <MaterialIcons name="arrow-forward" size={24} color="white" />

                                            <Text style={styles.textTitle}>Cargaison Detaille</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <View style={{justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ fontSize: 18, color: "#FF9900" }}>{errorCargaison}</Text>
                                    </View>
                                )
                            }
                        </View>
                        {/** cargaison data */}

                    </View>

                )
            }
            

        </View>
    )
}

export default CargaisonScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10
    },
    subContainer: {
        marginTop: 30,
        justifyContent: 'center',
    },
})