import { ActivityIndicator, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const DifferentAddress = ({userId, cartItems, grandTotal, shippingCost }) => {
    const navigation = useNavigation()
    const [userInfo, setUserInfo] = useState({ name: "", surname: "", phone: "", address: "" });

    const [nameEr, setNameEr] = useState("");
    const [surnameEr, setSurnameEr] = useState("");
    const [phoneEr, setPhoneEr] = useState("");
    const [regionEr, setRegionEr] = useState("");
    const [cityEr, setCityEr] = useState("");
    const [townEr, setTownEr] = useState("");
    const [neighborhoodEr, setNeighborhoodEr] = useState("");

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

    //console.log("regions:", regions);

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
   // console.log("selectedRegion:", selectedRegion);
   // console.log("cities:", cities);

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
   // console.log("neighborhoods:", neighborhoods);

    //console.log("towns:", towns);
   // console.log("regionId:", regionId);
   // console.log("regionName:", regionName);

  //  console.log("cityId:", cityId);
    //console.log("cityName:", cityName);

   // console.log("townId:", townId);
   // console.log("townName:", townName);

    //console.log("neighborhoodId:", neighborhoodId);
    //console.log("neighborhoodName:", neighborhoodName);

    // Validation function
    const userData = {
        userId: userId,
        name: userInfo.name + " " + userInfo.surname,
        phoneNumber: userInfo.phone,
        region: regionName,
        city: cityName,
        town: townName,
        neighborhood: neighborhoodName,
    }
    const handleAddress = async () => {
        const nameRegex = /^[A-Za-z\s]{3,}$/; // At least 3 letters, no numbers or special characters
        const phoneRegex = /^[0-9]{8}$/; // Exactly 8 digits


        if (!nameRegex.test(userInfo.name) || userInfo.name === "") {
            setNameEr("Invalid name");
        } else if (!nameRegex.test(userInfo.surname) || userInfo.surname === "") {
            setSurnameEr("Invalid Surname");
            setNameEr("");
        } else if (!phoneRegex.test(userInfo.phone) || userInfo.phone === "") {
            setPhoneEr("Invalid phone number");
            setNameEr("");
            setSurnameEr("");
        } else if (regionName === "") {
            setRegionEr("Region is required");
            setNameEr("");
            setSurnameEr("");
            setPhoneEr("");

        } else if (cityName === "") {
            setCityEr("City is required");
            setNameEr("");
            setSurnameEr("");
            setPhoneEr("");
            setRegionEr("");

        } else if (townName === "") {
            setTownEr("Town is required");
            setNameEr("");
            setSurnameEr("");
            setPhoneEr("");
            setRegionEr("");
            setCityEr("")

        } else if (neighborhoodName === "") {
            setNeighborhoodEr("Town is required");
            setNameEr("");
            setSurnameEr("");
            setPhoneEr("");
            setRegionEr("");
            setCityEr("");
            setTownEr("");

        } else {
            navigation.navigate("CheckoutScreen", {
                userData: userData,
                cartItems: cartItems,
                grandTotal: grandTotal,
                shippingCost: shippingCost
            })
            setNameEr("");
            setSurnameEr("");
            setPhoneEr("");
            setRegionEr("");
            setCityEr("");
            setTownEr("");
            setNeighborhoodEr("");
        }
    };

    return (
        <View style={{ marginBottom: 80 }}>
            <Text>Une autre adresse</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom"
                value={userInfo.name}
                onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
            />
            {nameEr && <Text style={styles.error}>{nameEr}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Prénom"
                value={userInfo.surname}
                onChangeText={(text) => setUserInfo({ ...userInfo, surname: text })}
            />
            {surnameEr && <Text style={styles.error}>{surnameEr}</Text>}
            <TextInput
                style={styles.input}
                placeholder="96 52 32 48"
                //place an empty space after 2 digits
                keyboardType="phone-pad"
                value={userInfo.phone}
                maxLength={8}
                onChangeText={(text) => setUserInfo({ ...userInfo, phone: text })}
            />
            {phoneEr && <Text style={styles.error}>{phoneEr}</Text>}

            {/**address */}


            <View style={{ marginTop: 30 }}>
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
                                {regionEr && <Text style={styles.error}>{regionEr}</Text>}

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
                                    {cityEr && <Text style={styles.error}>{cityEr}</Text>}

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
                                    {townEr && <Text style={styles.error}>{townEr}</Text>}

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
                                    {neighborhoodEr && <Text style={styles.error}>{neighborhoodEr}</Text>}

                                </View>


                            </>
                        )}





                    </View>
                )}
            </View>

            <TouchableOpacity
                onPress={handleAddress}
                style={{
                    marginTop: 40, justifyContent: "flex-start", alignItems: "center",
                }} >
                <View style={{ width: "100%", backgroundColor: "green", borderRadius: 10, padding: 10 }} >
                    <Text style={{ color: "white", fontSize: 18, textAlign: "center" }} > Confirmer</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default DifferentAddress

const styles = StyleSheet.create({
    input: { marginBottom: 8, marginRight: 20, height: 40, borderColor: 'gray', borderBottomWidth: 0.2, color: "#000000", paddingLeft: 4, fontSize: 16, borderRadius: 5 },
    error: { color: "red" },
})