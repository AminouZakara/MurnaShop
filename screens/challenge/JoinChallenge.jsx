import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import auth from "@react-native-firebase/auth"

const JoinChallenge = () => {
    const navigation = useNavigation();
    const userId = auth().currentUser.uid
    const db = getFirestore(app)
    const [isLoading, setIsLoading] = useState(false)

    //useEffects
    useEffect(() => {
        getUserData();
    }, [])

    {/* Get user data */ }
    const [userData, setUserData] = useState([])
    const getUserData = async () => {
        setIsLoading(true)
        try {
            setUserData([])
            const q = query(collection(db, "flipexUsers"), where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots.
                setUserData(doc.data());
            });
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }
    console.log("User data", userData);
    console.log("Challenge status", userData.challengeStatus);

    // startChallenge
    const userRef = doc(db, "flipexUsers", userId);

    const startChallenge = async () => {
        Alert.alert(
            "Start Challenge",
            "Would you like to start the challenge and win free courses?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: async () => {
                        setIsLoading(true)
                        try {
                            await updateDoc(userRef, {
                                challengeStatus: "joined",
                                chalengeJoinedDate: new Date(),
                            });
                            console.log('User already exists');
                            navigation.navigate('ChallengeScreen');
                            setIsLoading(false)
                            Alert.alert(
                                "Challenge Started",
                                "You have successfully started the challenge!!!",
                                [
                                    {
                                        text: "OK",
                                    },
                                ],
                            );
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }
            ],
        )

    }

    return (
        <View style={styles.container}>
            {
                isLoading ? (
                    <View>
                        <ActivityIndicator size="large" color="#0000ff" />

                    </View>
                ) : (
                    <View>
                        {
                            userData.challengeStatus === "joined" ? (
                                <View>
                                    <Text style={styles.text}>You are currently in a challenge!</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate("ChallengeScreen")}
                                        style={{
                                            marginTop: 30,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: "orange",
                                            padding: 10,
                                            borderRadius: 10,
                                        }}>
                                        <Text style={{ color: "white", fontWeight: "600", fontSize: 18 }}>My Challenge</Text>
                                    </TouchableOpacity>
                                </View>

                            ) : (
                                <View style={{

                                }}>
                                    <View >
                                        <Text style={{ fontSize: 16, color: "#000" }}>Join The Challenge and Get Your Free Courses</Text>

                                        <TouchableOpacity onPress={startChallenge}

                                            style={{
                                                marginTop: 30,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: "orange",
                                                padding: 10,
                                                borderRadius: 10,
                                            }}>
                                            <Text style={{ color: "white", fontWeight: "600", fontSize: 18 }}>Join Now</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>

                            )
                        }

                    </View>
                )
            }

        </View>
    )
}

export default JoinChallenge

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})