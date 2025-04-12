import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { collection, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import auth from "@react-native-firebase/auth"
import { Picker } from '@react-native-picker/picker';
import Icon from "react-native-vector-icons/MaterialIcons";


const EditProfile = () => {
     const navigation = useNavigation()
        useLayoutEffect(() => {
          // place the name of the App on right corner, the notification icon on left corner and the search bar bellow them
          navigation.setOptions({
            headerTitle: () => (<View
              style={{ marginLeft: 30 }}
            >
              <Text style={{ color: "#FF9900", fontSize: 18 }}>Modifier Profil</Text>
            </View>),
            headerStyle: {
              backgroundColor: "white",
              borderBottomColor: "transparent",
              shadowColor: "transparent"
            },
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10, }}>
                <Icon name="arrow-back" size={24} color="#FF9900" />
              </TouchableOpacity>
            ),
      
      
          });
        }, [navigation]);
    const db = getFirestore(app)
    const route = useRoute();
    const userData = route?.params?.userData;
    //reload the page when user comes back to this page
    useEffect(() => {
        navigation.addListener('focus', () => {
            console.log('reload page')
            //reload the page
            navigation.navigate('EditProfile', { userData: userData })
        })
    }, [navigation])

    console.log("User Data from Edit Profile", userData?.name);


    {/* Used to get user data end */ }
    //update user info by adding user phone number to the user data on firebase
    const getUser = (type) => {
        if (userData) {
            switch (type) {
                case "name":
                    return userData.name
                case "email":
                    return userData.email
                case "city":
                    return userData.city
                case "address":
                    return userData.address
                case "phoneNumber":
                    return userData.phoneNumber
            }

        } else
            return ""
    };



    const [name, setName] = useState(getUser('name'));
    const [email, setEmail] = useState(getUser('email'));
    const [city, setCity] = useState(getUser('city'));
    const [address, setAddress] = useState(getUser('address'));
    const [phoneNumber, setPhoneNumber] = useState(getUser('phoneNumber'));
    const [photoURL, setPhotoURL] = useState(getUser('photoURL'));
    

    // Pick address
    {/* Used to get Locations */ }
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);
    const [towns, setTowns] = useState([]);
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedTown, setSelectedTown] = useState("");
    const [selectedNeighborhood, setSelectedNeighborhood] = useState("");


    const [newRegion, setNewRegion] = useState("");
    const [newCity, setNewCity] = useState("");
    const [newTown, setNewTown] = useState("");
    const [newNeighborhood, setNewNeighborhood] = useState("");

    const [regionId, setRegionId] = useState("");
    const [cityId, setCityId] = useState("");
    const [townId, setTownId] = useState("");
    const [neighborhoodId, setNeighborhoodId] = useState("");

    const [regionName, setRegionName] = useState("");
    const [cityName, setCityName] = useState("");
    const [townName, setTownName] = useState("");
    const [neighborhoodName, setNeighborhoodName] = useState("");
    const [fieldValue, setFieldValue] = useState({});

    // Fetch Regions
    useEffect(() => {
        const fetchRegions = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, "regions"));
                const regionList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setRegions(regionList);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }

        };

        fetchRegions();
    }, []);

    console.log("regions:", regions);

    // Fetch Cities when Region is selected
    useEffect(() => {
        if (!selectedRegion) {
            setCities([]);
            setTowns([]);
            setNeighborhoods([]);
            return;
        }

        const fetchCities = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(
                    collection(db, `regions/${regionId}/cities`)
                );
                const cityList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCities(cityList);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }

        };

        fetchCities();
    }, [selectedRegion]);
    console.log("selectedRegion:", selectedRegion);
    console.log("cities:", cities);

    // Fetch Towns when City is selected
    useEffect(() => {
        if (!selectedCity) {
            setTowns([]);
            setNeighborhoods([]);
            return;
        }

        const fetchTowns = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(
                    collection(db, `regions/${regionId}/cities/${cityId}/towns`)
                );
                const townList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTowns(townList);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }

        };

        fetchTowns();
    }, [selectedCity]);


    // Fetch Neighborhoods when Town is selected
    useEffect(() => {
        if (!selectedTown) {
            setNeighborhoods([]);
            return;
        }

        const fetchNeighborhoods = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(
                    collection(db, `regions/${regionId}/cities/${cityId}/towns/${townId}/neighborhoods`)
                );
                const neighborhoodList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setNeighborhoods(neighborhoodList);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchNeighborhoods();
    }, [selectedTown]);
    console.log("neighborhoods:", neighborhoods);

    console.log("towns:", towns);
    console.log("regionId:", regionId);
    console.log("regionName:", regionName);

    console.log("cityId:", cityId);
    console.log("cityName:", cityName);

    console.log("townId:", townId);
    console.log("townName:", townName);

    console.log("neighborhoodId:", neighborhoodId);
    console.log("neighborhoodName:", neighborhoodName);


    //handle
    const handleInfo = () => {
        const user = auth().currentUser;
        const userRef = doc(db, 'murnaShoppingUsers', user.uid);
        const userUpdate = {
            name: name,
            email: email,
            region: regionName,
            city: cityName,
            town: townName,
            neighborhood: neighborhoodName,
            phoneNumber: phoneNumber,
            photoURL: userData.photoURL,
            userId: user.uid,
            lastLogin: new Date(),
            // photoURL: photoURL
        };
        const q = query(collection(db, "murnaShoppingUsers"), where("userId", "==", user.uid));
        // get the them and update them
        if (userData) {
            //Update User
            Alert.alert(
                `Modification`,
                `Voulez-vous vraiment modifier les  informations?`,
                [
                    {

                        text: 'Annuler',
                        onPress: () => navigation.goBack()
                    },
                    {
                        text: 'Oui', onPress: () => {
                            setLoading(true)
                            //update 
                            getDocs(q).then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    const post = doc.data();
                                    const postUpdate = {
                                        phoneNumber: phoneNumber,
                                    };
                                    updateDoc(doc.ref, postUpdate);
                                });
                            });
                            updateDoc(userRef, userUpdate)
                                .then(() => {
                                    Alert.alert(
                                        `Modification`,
                                        `Les informations ont été modifiées avec succès`,
                                        [

                                            {
                                                text: 'Ok',
                                                onPress: () => navigation.goBack()
                                            }
                                        ]
                                    );
                                    setLoading(false)
                                    console.log(" user is updated successfully");

                                }).catch((error) => {
                                    Alert.alert(
                                        `Modification`,
                                        `Une erreur est survenue`,
                                        [
                                            {
                                                text: 'OK',
                                                onPress: () => {
                                                    setLoading(false)
                                                    navigation.goBack()
                                                    console.log("Error:", error);

                                                }
                                            }
                                        ]
                                    );
                                });
                        }

                    }
                ]
            )

        }

    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                padding: 10,
                alignItems: "center",
            }}
        >
            {
                loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <ScrollView
                            showsVerticalScrollIndicator={false}

                            >
                            <View style={{ marginVertical: 10, marginBottom: 20 }}>
                                <Text style={{ fontSize: 16, fontWeight: "600", color: "gray" }}>
                                    Nom Prénom
                                </Text>

                                <TextInput
                                    value={name}
                                    onChangeText={(text) => setName(text)}
                                    placeholder="Nom Prenom"
                                    editable={false}
                                    style={{
                                        fontSize: name ? 18 : 18,
                                        borderBottomColor: "gray",
                                        borderBottomWidth: 1,
                                        marginVertical: 4,
                                        width: "100%",
                                        color: "black"

                                    }}
                                />
                            </View>
                            <View style={{ marginVertical: 20 }}>
                                <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                                    Email
                                </Text>

                                <TextInput
                                    value={email}
                                    editable={false}
                                    onChangeText={(text) => setEmail(text)}
                                    placeholder="enter your email address"

                                    style={{
                                        fontSize: email ? 18 : 18,
                                        borderBottomColor: "gray",
                                        borderBottomWidth: 1,
                                        marginVertical: 8,
                                        width: "100%",
                                        color: "black"
                                    }}
                                />
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                                    Phone
                                </Text>

                                <TextInput
                                    value={phoneNumber}
                                    onChangeText={(text) => setPhoneNumber(text)}
                                    placeholder="96-52-43-34"
                                    placeholderTextColor={"orange"}
                                    numberOfLines={1}
                                    keyboardType='numeric'

                                    style={{
                                        fontSize: phoneNumber ? 18 : 18,
                                        borderBottomColor: "gray",
                                        borderBottomWidth: 1,
                                        marginVertical: 10,
                                        width: 300,
                                        color: "black"
                                    }}
                                />
                            </View>



                            {/*Address Dropdown List with picker*/}
                            
                            <View style={{marginTop: 30}}>
                            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
                                    Address
                                </Text>
                                {loading ? <ActivityIndicator size="large" color="blue" /> : (
                                    <View>
                                        {
                                            <View style={{
                                                paddingHorizontal: 10,
                                                borderWidth: 0.8,
                                                borderColor: 'grey',
                                                borderRadius: 10,
                                                marginTop: 10

                                            }}>
                                                <Picker
                                                    //enabled={!post ? true : false}

                                                    selectedValue={selectedRegion}
                                                    onValueChange={
                                                        (itemValue, itemIndex) => {
                                                            setSelectedRegion(itemValue);
                                                            setRegionId(itemValue.id)
                                                            setRegionName(itemValue.name)
                                                            setFieldValue('region', itemValue.name);
                                                            setSelectedCity(null);
                                                            setSelectedTown(null);
                                                            setSelectedNeighborhood(null)
                                                        }
                                                    }
                                                // style={{ color: post ? 'lightgrey' : 'black' }}

                                                >

                                                    <Picker.Item label="Select Region" value="" style={{
                                                        color: 'grey',
                                                        fontSize: 18

                                                    }} />
                                                    {regions.map(region => (
                                                        <Picker.Item key={region.id} label={region.name} value={region} />
                                                    ))}
                                                </Picker>

                                            </View>
                                        }

                                        {selectedRegion && (
                                            <>
                                                <View style={{
                                                    paddingHorizontal: 10,
                                                    borderWidth: 0.8,
                                                    borderColor: 'grey',
                                                    borderRadius: 10,
                                                    marginTop: 15

                                                }}>
                                                    <Picker
                                                        //  enabled={!post ? true : false}

                                                        selectedValue={selectedCity}
                                                        onValueChange={
                                                            (itemValue, itemIndex) => {
                                                                setSelectedCity(itemValue);
                                                                setCityId(itemValue.id)
                                                                setCityName(itemValue.name)
                                                                setFieldValue('city', itemValue.name);
                                                                setSelectedTown(null);
                                                                setSelectedNeighborhood(null)
                                                            }

                                                        }
                                                    //style={{ color: post ? 'lightgrey' : 'black' }}

                                                    >
                                                        <Picker.Item label="Select City" value="" style={{
                                                            color: 'grey',
                                                            fontSize: 18

                                                        }} />
                                                        {cities.map(city => (
                                                            <Picker.Item key={city.id} label={city.name} value={city} />
                                                        ))}
                                                    </Picker>

                                                </View>

                                            </>
                                        )}


                                        {selectedCity && (
                                            <>
                                                <View style={{
                                                    paddingHorizontal: 10,
                                                    borderWidth: 0.8,
                                                    borderColor: 'grey',
                                                    borderRadius: 10,
                                                    marginTop: 15

                                                }}>

                                                    <Picker
                                                        //    enabled={!post ? true : false}

                                                        selectedValue={selectedTown}
                                                        onValueChange={
                                                            (itemValue, itemIndex) => {
                                                                setSelectedTown(itemValue);
                                                                setTownId(itemValue.id)
                                                                setTownName(itemValue.name)
                                                                setFieldValue('town', itemValue.name);
                                                                setSelectedNeighborhood(null)
                                                            }
                                                        }
                                                    //   style={{ color: post ? 'lightgrey' : 'black' }}

                                                    >
                                                        <Picker.Item label="Select Town" value="" style={{
                                                            color: 'grey',
                                                            fontSize: 18

                                                        }}

                                                        />
                                                        {towns.map(town => (
                                                            <Picker.Item key={town.id} label={town.name} value={town} />
                                                        ))}
                                                    </Picker>

                                                </View>

                                            </>
                                        )}
                                        {/******** Neighborhood *********/}
                                        {selectedTown && (
                                            <>
                                                <View style={{
                                                    paddingHorizontal: 10,
                                                    borderWidth: 0.8,
                                                    borderColor: 'grey',
                                                    borderRadius: 10,
                                                    marginTop: 15

                                                }}>

                                                    <Picker
                                                        //    enabled={!post ? true : false}

                                                        selectedValue={selectedNeighborhood}
                                                        onValueChange={
                                                            (itemValue, itemIndex) => {
                                                                setSelectedNeighborhood(itemValue);
                                                                setNeighborhoodId(itemValue.id)
                                                                setNeighborhoodName(itemValue.name)
                                                                setFieldValue('neighborhood', itemValue.name);
                                                            }
                                                        }
                                                    //   style={{ color: post ? 'lightgrey' : 'black' }}

                                                    >
                                                        <Picker.Item label="Select Neighborhood" value="" style={{
                                                            color: 'grey',
                                                            fontSize: 18

                                                        }}

                                                        />
                                                        {neighborhoods.map(neighborhood => (
                                                            <Picker.Item key={neighborhood.id} label={neighborhood.name} value={neighborhood} />
                                                        ))}
                                                    </Picker>

                                                </View>


                                            </>
                                        )}





                                    </View>
                                )}
                            </View>


                        </ScrollView>



                        <TouchableOpacity
                            onPress={handleInfo}
                            style={{
                                width: "95%",
                                backgroundColor: "#FF9900",
                                padding: 10,
                                borderRadius: 15,
                                marginTop: 50,
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                        >
                            <Text

                                style={{
                                    textAlign: "center",
                                    color: "white",
                                    fontSize: 18,
                                    fontWeight: "bold",
                                }}
                            >
                                Modifier
                            </Text>
                        </TouchableOpacity>
                    </>
                )
            }







        </SafeAreaView>
    )
}

export default EditProfile

const styles = StyleSheet.create({})