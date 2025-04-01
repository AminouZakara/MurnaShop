import { ActivityIndicator, Alert, Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { doc, addDoc, collection, getDocs, getFirestore, onSnapshot, query, where } from 'firebase/firestore'
import { Picker } from '@react-native-picker/picker'
import { db } from '../../../firebaseConfig'

const AddLocations = () => {
    const navigation = useNavigation();
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                    collection(db, `regions/${selectedRegion}/cities`)
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
                    collection(db, `regions/${selectedRegion}/cities/${selectedCity}/towns`)
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
    console.log("towns:", towns);

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
                      collection(
                          db,
                          `regions/${selectedRegion}/cities/${selectedCity}/towns/${selectedTown}/neighborhoods`
                      )
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
  
          };
  
          fetchNeighborhoods();
      }, [selectedTown]);
     console.log("neighborhoods:", neighborhoods);

    const checkIfExists = async (collectionPath, name) => {
        const q = query(collection(db, collectionPath), where("name", "==", name));
        const snapshot = await getDocs(q);
        return !snapshot.empty;
    };


    const addLocation = async () => {
        try {
            let regionId = selectedRegion || null;
            let cityId = selectedCity || null;
            let townId = selectedTown || null;
            let neighborhoodId = selectedNeighborhood || null;
            if (newRegion) {
                if (await checkIfExists("regions", newRegion)) {
                    return Alert.alert("error", "Region already exists");
                }
                const regionRef = await addDoc(collection(db, "regions"), { name: newRegion });
                regionId = regionRef.id;
            }

            if (newCity) {
                if (await checkIfExists(`regions/${regionId}/cities`, newCity)) {
                    return Alert.alert("error", "City already exists");
                }
                const cityRef = await addDoc(collection(db, `regions/${regionId}/cities`), { name: newCity });
                cityId = cityRef.id;
            }
            if (newTown) {
                if (await checkIfExists(`regions/${regionId}/cities/${cityId}/towns`, newTown)) {
                    return Alert.alert("error", "Town already exists");
                }
                const townRef = await addDoc(collection(db, `regions/${regionId}/cities/${cityId}/towns`), { name: newTown });
                townId = townRef.id;
            }

            if (newNeighborhood) {
                if (await checkIfExists(`regions/${regionId}/cities/${cityId}/towns/${townId}/neighborhoods`, newNeighborhood)) {
                    return Alert.alert("error", "Neighborhood already exists");
                }
                const newNeighborhoodRef = await addDoc(collection(db, `regions/${regionId}/cities/${cityId}/towns/${townId}/neighborhoods`), { name: newNeighborhood });
                neighborhoodId = newNeighborhoodRef.id;
            }

            Alert.alert("Success", "Location added successfully!");
            setNewRegion("");
            setNewCity("");
            setNewTown("");
            setNewNeighborhood("");
            setSelectedRegion("");
            setSelectedCity("");
            setSelectedTown("");
        } catch (error) {
            Alert.alert("Error adding location");
            console.log(" Error adding location", error);

        }
    };

    return (
        <KeyboardAvoidingView>

            <ScrollView>

                <View style={{ backgroundColor: "green" }}>
                    <View style={{ marginTop: 40, paddingHorizontal: 10, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "white", fontSize: 24, fontWeight: "800" }}>Add New Address</Text>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.button}>
                            <Text style={{ color: "white", fontWeight: "500" }}>Add Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{ marginTop: 15, fontWeight: "400", fontSize: 20, textAlign: "center" }}>Create New Address</Text>

                {/* add a form of 2 input fields and 1 button */}
                <View style={styles.container}>
                    {loading ? <ActivityIndicator size="large" color="blue" /> : (
                        <>
                            <Text style={styles.label}>Select Region:</Text>
                            <Picker selectedValue={selectedRegion} onValueChange={setSelectedRegion}>
                                <Picker.Item label="Select Region" value="" />
                                {regions.map(region => (
                                    <Picker.Item key={region.id} label={region.name} value={region.id} />
                                ))}
                            </Picker>
                            <TextInput
                                value={newRegion}
                                onChangeText={setNewRegion}
                                placeholder="New Region"
                                style={styles.input}
                            />

                            {selectedRegion && (
                                <>
                                    <Text style={styles.label}>Select City:</Text>
                                    <Picker selectedValue={selectedCity} onValueChange={setSelectedCity}>
                                        <Picker.Item label="Select City" value="" />
                                        {cities.map(city => (
                                            <Picker.Item key={city.id} label={city.name} value={city.id} />
                                        ))}
                                    </Picker>
                                    <TextInput
                                        value={newCity}
                                        onChangeText={setNewCity}
                                        placeholder="New City"
                                        style={styles.input}
                                    />
                                </>
                            )}

                            {selectedCity && (
                                <>
                                    <Text style={styles.label}>Select Town:</Text>
                                    <Picker selectedValue={selectedTown} onValueChange={setSelectedTown}>
                                        <Picker.Item label="Select Town" value="" />
                                        {towns.map(town => (
                                            <Picker.Item key={town.id} label={town.name} value={town.id} />
                                        ))}
                                    </Picker>
                                    <TextInput
                                        value={newTown}
                                        onChangeText={setNewTown}
                                        placeholder="New Town"
                                        style={styles.input}
                                    />
                                </>
                            )}
                            {/******** Neighborhood ********  */}
                            {selectedTown && (
                                <>
                                    <Text style={styles.label}>New Neighborhood:</Text>
                                    <TextInput
                                        value={newNeighborhood}
                                        onChangeText={setNewNeighborhood}
                                        placeholder="Neighborhood"
                                        style={styles.input}
                                    />
                                </>
                            )}
                       



                            <Button title="Save" onPress={addLocation} style={styles.button} />

                        </>
                    )}
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default AddLocations

const styles = StyleSheet.create({})