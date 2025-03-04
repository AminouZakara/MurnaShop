import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

const Header = () => {
    const navigation = useNavigation();
    const user = auth().currentUser;
    console.log("USer email:", user.email);
    const db = getFirestore(app)
    //states
    const [isLoading, setIsLoading] = useState(false);

    //useEffect
    useEffect(() => {
        getUserData();
    }, [])
    const [userData, setUserData] = useState([])
    const getUserData = async () => {
        setIsLoading(true)
        try {
            setUserData([])
            const q = query(collection(db, "flipexUsers"), where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots.
                setUserData(doc.data());
            });
            setIsLoading(false)
        } catch (error) {
            console.log("Oops! cannot get user data: ", error)
            setIsLoading(false)
        }
    }
    console.log("User role: ", userData.role)
    return (
        <View style={styles.header}>
            <View style={styles.headerContainer}>
                <Image source={require('../../assets/images/logo.png')} style={{
                    width: 100,
                    height: 40,
                    resizeMode: 'contain',
                    backgroundColor: "white",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }} />
                <AntDesign name="gift" size={20} color="white" 
                        style={{ 
                            position: 'absolute',
                            zIndex: 1,
                            right: 0,
                            top: -12,
                            }}/>
                {
                    userData.role === "admin" ? (
                        <TouchableOpacity onPress={()=> navigation.navigate("AddQuiz")}>
                        <Entypo name="circle-with-plus" size={24} color="white"  />
                        </TouchableOpacity>
                    ):(
                        <TouchableOpacity onPress={()=> navigation.navigate("JoinChallenge")}
                        style={{
                           
                        }}
                        >
                       
                        <View style={{
                            backgroundColor: "orange",
                             borderRadius: 4,
                             paddingHorizontal:6,
                             justifyContent: "center",
                             paddingVertical:4
                        }}>
                        <Text style={{color:"white", fontWeight: "500"}}>Get Free Courses</Text>
                            
                        </View>
                        </TouchableOpacity>
                    )
                }
               
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        height: 50,
        width: "100%"
    },
    headerContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    }
})