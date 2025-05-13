import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from '@expo/vector-icons/AntDesign';
import { firebase } from '@react-native-firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';


const Register = () => {
    const navigation = useNavigation();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [dateOfBirth, setdateOfBirth] = useState("");
    const [loading, setLoading] = useState(false)



    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const toggleDatePicker = (modeToShow) => {
        setShowPicker(!showPicker);
    };
    const onChange = ({ type }, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setDate(currentDate);

            if (Platform.OS === "android") {
                toggleDatePicker();
                setdateOfBirth(currentDate.toDateString());
            }
        } else {
            toggleDatePicker()
        }
    };
    const confirmIOSDate = () => {
        setdateOfBirth(date.toDateString());
        toggleDatePicker()
    }

    // let the user register by sending sending email verification
    const register = async () => {
        //check if all the fields are filled
        if (!displayName || !email || !password || !dateOfBirth || !confirmPassword) {
            Alert.alert(
                "Votre Information est Invalide",
                "SVP remplissez tous les champs",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        } else
            //check if the password and confirm password are the same
            if (password !== confirmPassword) {
                Alert.alert(
                    "Mot de passe Invalide",
                    "SVP entrez le même mot de passe dans les deux champs",
                )
                return;
            } else
                //check if the password is strong

                //check if the email is valid

                //check if the date of birth is valid
                if (dateOfBirth < new Date('2007-01-01')) {
                    alert("You must be at least 18 years old");
                    return;
                } else {
                    try {
                        setLoading(true)
                        const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
                        await user.user.sendEmailVerification();
                        await setDoc(doc(db, "murnaShoppingUsers", user.user.uid), {
                            name: displayName,
                            email: email,
                            dateOfBirth: dateOfBirth,
                            photoURL: null,
                            emailVerified: false,
                            region: "",
                            city: "",
                            town: "",
                            neighborhood: "",
                            sellerOf: "",
                            storeAddress: "",
                            phoneNumber: "",
                            userId: user.user.uid,
                            role: 'user',
                            createdAt: new Date(),

                        });
                        // français
                        Alert.alert("Félicitation!", 
                            "Votre compte a été créé avec succès. Veuillez vérifier votre boîte de réception pour confirmer votre adresse e-mail.",
                          );
                        navigation.navigate("Login");
                    } catch (error) {
                        console.log("Error:", error);
                        Alert.alert("Erreur", error.message);
                        setLoading(false)
                    }
                }

    }
    return (
        <ScrollView
            style={{
                backgroundColor: "white",
            }}
            contentContainerStyle={{
                padding: 20,

            }}
        >
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }} >
                <SafeAreaView
                    style={{
                        flex: 1,
                    }}
                >
                    <KeyboardAvoidingView>
                        <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                            <AntDesign name="back" size={30} color="#FF9900" style={{ top: 20, left: 0 }} />
                        </TouchableOpacity>

                        <View style={styles.container}>
                            <View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {/* logo image */}
                                <Image
                                    source={require("../../assets/images/logo.png")}
                                    style={{
                                        marginTop: 10,
                                        width: 150,
                                        height: 150,
                                        resizeMode: "contain",
                                        borderRadius: 75,
                                        alignSelf: "center"

                                    }}
                                />
                            </View>

                            <View style={{ marginTop: 5, width: "100%" }}>
                                <View>
                                    <Text style={{ fontSize: 17, fontWeight: "600", color: "gray" }}>
                                        Nom prenom
                                    </Text>

                                    <TextInput
                                        value={displayName}
                                        onChangeText={(text) => setDisplayName(text)}
                                        placeholder="Nom prenom"
                                        placeholderTextColor={"orange"}
                                        style={{
                                            fontSize: displayName ? 17 : 17,
                                            borderBottomColor: "gray",
                                            borderBottomWidth: 1,
                                            marginVertical: 10,
                                            width: "100%",
                                            color: displayName ? "green" : "orange"

                                        }}
                                    />
                                </View>

                                <View style={{ marginTop: 15 }}>
                                    <Text style={{ fontSize: 17, fontWeight: "600", color: "gray" }}>
                                        Email
                                    </Text>

                                    <TextInput
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
                                        placeholder="Entrez votre adresse email"
                                        placeholderTextColor={email ? 'green' : "orange"}
                                        autoCapitalize={false}


                                        style={{
                                            fontSize: email ? 17 : 17,
                                            borderBottomColor: "gray",
                                            borderBottomWidth: 1,
                                            marginVertical: 10,
                                            width: "100%",
                                            color: email ? "green" : "orange"
                                        }}
                                    />
                                </View>

                                <View style={{ marginTop: 15 }}>
                                    <Text style={{ fontSize: 17, fontWeight: "600", color: "gray" }}>
                                        Date de naissance
                                    </Text>
                                    {/* Date and Time */}
                                    <Pressable
                                        style={{ lexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }} >
                                        <View

                                            style={{
                                                fontSize: dateOfBirth ? 17 : 17,
                                                borderBottomColor: "gray",
                                                borderBottomWidth: 1,
                                                marginVertical: 10,
                                                width: "100%",

                                            }}>
                                            {showPicker && (
                                                <DateTimePicker
                                                    value={date}
                                                    is24Hour={true}
                                                    mode='date'
                                                    onChange={onChange}
                                                    minimumDate={new Date('1924-03-31')}
                                                    maximumDate={new Date('2007-03-31')}
                                                    style={styles.datePicker}
                                                />
                                            )}
                                            {showPicker && Platform.OS === "ios" && (
                                                <View style={{ flexDirection: "row", justifyContent: "space-around" }} >
                                                    <TouchableOpacity style={[
                                                        styles.button,
                                                        styles.pickerButton,
                                                        { backgroundColor: "#11182711" }
                                                    ]}
                                                        onPress={toggleDatePicker}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.buttonText,
                                                                { color: '#075985' }
                                                            ]
                                                            }
                                                        >Annuler</Text>

                                                    </TouchableOpacity>

                                                    <TouchableOpacity style={[
                                                        styles.button,
                                                        styles.pickerButton,
                                                    ]}
                                                        onPress={confirmIOSDate}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.buttonText,
                                                            ]
                                                            }
                                                        >Confirmer</Text>

                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                            {!showPicker && (
                                                <Pressable onPress={toggleDatePicker}>

                                                    <TextInput
                                                        style={{ fontSize: 17, color: dateOfBirth ? "green" : "orange" }}
                                                        // placeholder={new Date(item.eventDate).toLocaleString()}
                                                        placeholder={dateOfBirth ? dateOfBirth : 'JJ - MM - AAAA'}
                                                        placeholderTextColor={dateOfBirth ? "green" : 'orange'}
                                                        editable={false}
                                                        value={dateOfBirth}
                                                        onPressIn={toggleDatePicker}


                                                    />
                                                </Pressable>
                                            )}

                                        </View>
                                    </Pressable>

                                </View>

                                <View style={{ marginTop: 15 }}>
                                    <Text style={{ fontSize: 17, fontWeight: "600", color: "gray" }}>
                                        Mot de passe
                                    </Text>

                                    <TextInput
                                        value={password}
                                        onChangeText={(text) => setPassword(text)}
                                        secureTextEntry={true}
                                        placeholder="* * * * * * * * *"
                                        placeholderTextColor={"orange"}
                                        style={{
                                            fontSize: password ? 17 : 17,
                                            borderBottomColor: "gray",
                                            borderBottomWidth: 1,
                                            marginVertical: 10,
                                            width: "100%",
                                            color: password ? "green" : "orange"

                                        }}
                                    />
                                </View>
                                <View style={{ marginTop: 15 }}>
                                    <Text style={{ fontSize: 17, fontWeight: "600", color: "gray" }}>
                                        Confirmer le mot de passe
                                    </Text>

                                    <TextInput
                                        value={confirmPassword}
                                        onChangeText={(text) => setConfirmPassword(text)}
                                        secureTextEntry={true}
                                        placeholder="* * * * * * * * *"
                                        placeholderTextColor={"orange"}
                                        style={{
                                            fontSize: confirmPassword ? 17 : 17,
                                            borderBottomColor: "gray",
                                            borderBottomWidth: 1,
                                            marginVertical: 10,
                                            width: "100%",
                                            color: confirmPassword ? "green" : "orange"

                                        }}
                                    />
                                </View>

                            </View>

                            <Pressable
                                onPress={register}
                                style={{
                                    width: "100%",
                                    height: 50,
                                    backgroundColor: "#FF9900",
                                    padding: 10,
                                    borderRadius: 7,
                                    marginTop: 30,
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
                                    {
                                        loading ? "En cours..." : "Crée mon compte"
                                    }
                                    
                                </Text>
                            </Pressable>



                            <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center", width:"95%" }}>
                                <Text style={{ color: "grey", fontSize: 12, textAlign:"center"}}>En créant un compte, vous acceptez nos conditions
                                    d'utilisation et vous confirmez avoir lu notre politique de confidentialité.</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('ConditionsJuridiquesPolitiques')}>
                                        <Text style={{ color: "#176BEF", fontSize: 12, textAlign:"center"}}>
                                            Lire la politique de confidentialité
                                        </Text>
                                    </TouchableOpacity>
                            </View>

                            <View

                                style={{ marginTop: 20, flexDirection: "row", justifyContent: "center" }}
                            >
                                <Text style={{ textAlign: "center", color: "gray", fontSize: 15 }}>
                                    Vous avez déjà un compte?
                                </Text>
                                <Pressable
                                    onPress={() => navigation.goBack()}
                                >
                                    <Text style={{ textAlign: "center", color: "#176BEF", fontSize: 15 }}> Connecter </Text>
                                </Pressable>
                            </View>
                        </View>


                    </KeyboardAvoidingView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </ScrollView>

    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
})