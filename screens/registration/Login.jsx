import { Alert, Image, Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
    const navigation = useNavigation()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        navigation.navigate('Main');
    }

    const forgotPassword = () => {
        if (email) {
            console.log("OK Pressed")
        }
        else {
            Alert.alert(
                "Réinitialisation de mot de passe",
                "Veuillez saisir votre adresse email",
                [
                    {
                        text: "OK",
                        onPress: () => console.log("OK Pressed")
                    }
                ],
                { cancelable: false }
            );
        }
    };

  return (
    <View style={{
        flex: 1,
        backgroundColor: "white",

    }}>
<TouchableWithoutFeedback
        onPress={() => {
            Keyboard.dismiss();
        }}
    >
        <KeyboardAvoidingView>
                <SafeAreaView
                    style={{
                        backgroundColor: "white",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <View>
                        <Image
                            source={require("../../assets/images/logo.png")}
                            style={{
                                marginTop:100,
                                marginVertical:30,
                                width: 150,
                                height: 150,
                                resizeMode: "contain",
                                borderRadius: 75,
                                alignSelf:"center"
                            }}
                        />
                    {/* ----------- Email and Password ------------- */}
                    <View style={{ marginTop: 20 }}>
                        <View style={{ marginTop: 0 }}>
                            <Text style={{ fontSize: 17, fontWeight: "600", color: "gray" }}>
                                Email
                            </Text>

                            <TextInput
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                placeholder="Entrer votre address email"
                                placeholderTextColor={email ? 'green' : "orange"}
                                autoCapitalize={false}


                                style={{
                                    fontSize: email ? 17 : 17,
                                    borderBottomColor: "gray",
                                    borderBottomWidth: 1,
                                    marginVertical: 10,
                                    width: 300,
                                    color: email ? "green" : "orange"
                                }}
                            />
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <Text style={{ fontSize: 17, fontWeight: "600", color: "gray" }}>
                                Mot de passe
                            </Text>

                            <TextInput
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={true}
                                placeholder="* * * * * * * * * * * "
                                placeholderTextColor={"orange"}
                                style={{
                                    fontSize: password ? 17 : 17,
                                    borderBottomColor: "gray",
                                    borderBottomWidth: 1,
                                    marginVertical: 10,
                                    width: 300,
                                    color: password ? "green" : "orange"

                                }}
                            />
                        </View>

                    </View>
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={{
                            width: 300,
                            backgroundColor: "#FF9900",
                            padding: 14,
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
                                fontSize: 14,
                                fontWeight: "bold",
                            }}
                        >
                            CONNECTER
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={
                            () => console.log("GoogleSignin clicked")
                        }
                        style={{
                            width: 300,
                            backgroundColor: "#176BEF",
                            padding: 14,
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
                                fontSize: 15,
                                fontWeight: "bold",
                            }}
                        >
                            Connecter avec Google
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginTop: 30 }}
                        onPress={forgotPassword}
                    >
                        <Text style={{ textAlign: "center", color: "grey", fontSize: 15 }}>Mot de passe oublié?</Text>
                    </TouchableOpacity>

                    <View

                        style={{ marginTop: 5, flexDirection: "row" }}
                    >
                        <Text style={{ textAlign: "center", color: "gray", fontSize: 15 }}>
                            Vous n'avez pas un compte?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Register')}
                        >
                            <Text style={{ textAlign: "center", color: "#176BEF", fontSize: 15 }}> Créer ici</Text>
                        </TouchableOpacity>
                    </View>

                    </View>


                </SafeAreaView>
        </KeyboardAvoidingView>

    </TouchableWithoutFeedback>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})