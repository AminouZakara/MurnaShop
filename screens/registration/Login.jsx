import { ActivityIndicator, Alert, Image, Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { FIREBASE_WEB_CLIENT_ID } from '@env'
import { getUserRole } from '../../Shared/Services'

const Login = () => {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userAuth, setUserAuth] = useState(null)


    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert(
                "Votre Information est Invalide",
                "SVP remplissez tous les champs",
                [
                    { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
            return;
        }

        try {
            setLoading(true);
            // Sign in with email and password
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                Alert.alert(
                    "Email Invalide",
                    "SVP entrez une adresse email valide",
                    [
                        { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
                return;
            }
            if (password.length < 6) {
                Alert.alert(
                    "Mot de passe Invalide",
                    "SVP entrez un mot de passe valide",
                    [
                        { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
                return;
            }
            const emailLower = email.toLowerCase();
            const userCredential = await auth().signInWithEmailAndPassword(emailLower, password);
            const user = userCredential.user;

            // Check email verification
            if (!user.emailVerified) {
                Alert.alert(
                    "Email non Vérifié",
                    "SVP vérifier votre email avant de vous connecter",
                    [
                        {
                            text: "OK",
                            onPress: async () => {
                                await auth().signOut();
                                navigation.navigate('Login');
                            }
                        }
                    ],
                    { cancelable: false }
                );
                return;
            }

            const docRef = doc(db, "murnaShoppingUsers", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists() && docSnap.data().emailVerified === true) {
                await updateDoc(docRef, {
                    lastLogin: new Date(),
                });
            }

            // Get role and navigate accordingly
            const uid = user.uid;
            const role = await getUserRole(uid); // Your own utility function

            switch (role) {
                case 'admin':
                    navigation.navigate('AdminMain');
                    break;
                case 'author':
                    navigation.navigate('AuthorMain');
                    break;
                case 'cargaison':
                    navigation.navigate('CargaisonMain');
                    break;
                case 'user':
                    navigation.navigate('Main');
                    break;
                default:
                    Alert.alert("Erreur", "Rôle inconnu. Contactez le support.");
                    break;
            }

        } catch (error) {
            console.error("Login Error:", error);
            setError(error.message);
            Alert.alert(
                "Incorrect",
                "SVP vérifier votre email et votre mot de passe",
                [{ text: "OK" }]
            );
        } finally {
            setLoading(false);
        }
    };


    //Google Login 
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: FIREBASE_WEB_CLIENT_ID
        });
    }, []);

    async function handleGoogleLogin() {
        setIsLoading(true);
        try {
            const result = await GoogleSignin.signIn();
            const token = result.data.idToken;
            const credential = auth.GoogleAuthProvider.credential(token);
            const userCredntial = await auth().signInWithCredential(credential);
            //setAuthUser to user credential
            console.log(userCredntial.user);
            const user = userCredntial.user;

            // if user is a new sign in, save data
            const docRef = doc(db, "murnaShoppingUsers", userCredntial.user.uid);
            if (userCredntial.additionalUserInfo.isNewUser) {
                await setDoc(docRef, {
                    name: userCredntial.user.displayName,
                    email: userCredntial.user.email,
                    photoURL: userCredntial.user.photoURL,
                    userId: userCredntial.user.uid,
                    region: "",
                    city: "",
                    town: "",
                    neighborhood: "",
                    sellerOf: "",
                    storeAddress: "",
                    phoneNumber: "",
                    role: 'user',
                    createdAt: new Date(),
                });
                console.log('User created');
                navigation.navigate('Main');
                setIsLoading(false)

            }
            else {
                await updateDoc(docRef, {
                    lastLogin: new Date(),
                });
                const role = await getUserRole(user.uid);

                switch (role) {
                    case 'admin':
                        navigation.navigate('AdminMain');
                        break;
                    case 'author':
                        navigation.navigate('AuthorMain');
                        break;
                    case 'cargaison':
                        navigation.navigate('CargaisonMain');
                        break;
                    case 'user':
                        navigation.navigate('Main');
                        break;
                    default:
                        Alert.alert(
                            "Erreur",
                            "Rôle utilisateur inconnu. Contactez un administrateur.",
                            [{ text: "OK" }]
                        );
                }
                console.log('Existing user logged in with role:', role);
                setIsLoading(false)
            }

            setUserAuth(user); // Optio
        } catch (error) {
            console.error('Google Login Error:', error);
            Alert.alert(
                "Erreur de connexion",
                error.message || "Impossible de se connecter avec Google. Veuillez réessayer."
            );
            setIsLoading(false)
        }
    }

    //
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(async (user) => {
            if (user && user.emailVerified) {
                setUserAuth(user);

                // Optional: load role and redirect
                const role = await getUserRole(user.uid);
                switch (role) {
                    case 'admin':
                        navigation.navigate('AdminMain');
                        break;
                    case 'author':
                        navigation.navigate('AuthorMain');
                        break;
                    case 'cargaison':
                        navigation.navigate('CargaisonMain');
                        break;
                    case 'user':
                        navigation.navigate('Main');
                        break;
                    default:
                        Alert.alert("Erreur", "Rôle inconnu");
                        break;
                }

            } else {
                setUserAuth(null);
                navigation.navigate('Login');
            }
        });

        return unsubscribe;
    }, []);

    const forgotPassword = () => {
        if (email) {
            auth().sendPasswordResetEmail(email)
                .then(() => {
                    Alert.alert(
                        "Réinitialisation de mot de passe",
                        "Un email de réinitialisation de mot de passe a été envoyé à votre adresse email Veuillez consulter votre boîte de réception.",
                        [
                            {
                                text: "OK",
                                onPress: () => console.log("OK Pressed")
                            }
                        ],
                        { cancelable: false }
                    );
                })
                .catch((err) => {
                    Alert.alert(
                        "Réinitialisation de mot de passe",
                        "Une erreur est survenue lors de l'envoi de l'email de réinitialisation de mot de passe. Veuillez réessayer plus tard.",
                        [
                            {
                                text: "OK",
                                onPress: () => console.log("OK Pressed")
                            }
                        ],
                        { cancelable: false }
                    );
                    console.log(" Error: ", err);

                });
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

        }}>
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}
            >
                <KeyboardAvoidingView>
                    <SafeAreaView
                        style={{
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <View>
                            <Image
                                source={require("../../assets/images/logo.png")}
                                style={{
                                    marginTop: 100,
                                    marginVertical: 30,
                                    width: 150,
                                    height: 150,
                                    resizeMode: "contain",
                                    borderRadius: 75,
                                    alignSelf: "center"
                                }}
                            />
                            {/* ----------- Email and Password ------------- */}
                            <View style={{ marginTop: 20 }}>
                                <View style={{ marginTop: 0 }}>
                                    <Text style={{ fontSize: 17, fontWeight: "500", }}>
                                        Email
                                    </Text>

                                    <TextInput
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
                                        placeholder="Entrer votre address email"
                                        placeholderTextColor={email ? 'green' : "gray"}
                                        autoCapitalize={false}


                                        style={{
                                            fontSize: email ? 17 : 17,
                                            borderBottomColor: "gray",
                                            borderBottomWidth: 1,
                                            marginVertical: 10,
                                            width: 300,
                                            color: email ? "green" : "gray"
                                        }}
                                    />
                                </View>

                                <View style={{ marginTop: 15 }}>
                                    <Text style={{ fontSize: 17, fontWeight: "500", }}>
                                        Mot de passe
                                    </Text>

                                    <TextInput
                                        value={password}
                                        onChangeText={(text) => setPassword(text)}
                                        secureTextEntry={true}
                                        placeholder="* * * * * * * * * * * "
                                        placeholderTextColor={"gray"}
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
                                    {
                                        loading ? <ActivityIndicator size="small" color="white" /> : "SE CONNECTER"
                                    }
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleGoogleLogin}
                                style={{
                                    width: 300,
                                    backgroundColor: "white",
                                    padding: isLoading ? 14 : 6,
                                    borderRadius: 7,
                                    marginTop: 30,
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                            >
                                {
                                    isLoading ? <ActivityIndicator size="small" color="blue" /> :
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image
                                                source={require('../../assets/images/google.png')}
                                                style={{
                                                    width: 35,
                                                    height: 35,
                                                    marginRight: 10,
                                                }}
                                            />
                                            <Text style={{
                                                textAlign: "center",
                                                fontSize: 15,
                                                color: "grey",
                                                fontWeight: "700",
                                            }}>CONTINUER AVEC GOOGLE</Text>

                                        </View>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ marginTop: 30 }}
                                onPress={forgotPassword}
                            >
                                <Text style={{ textAlign: "center", color: "grey", fontSize: 15 }}>Mot de passe oublié?</Text>
                            </TouchableOpacity>

                            <View

                                style={{ marginTop: 5, flexDirection: "row", justifyContent: "center" }}
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