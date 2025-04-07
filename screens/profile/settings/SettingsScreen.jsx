import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
import AntDesign from '@expo/vector-icons/AntDesign';
import auth from '@react-native-firebase/auth'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';



const SettingsScreen = () => {
     const navigation = useNavigation()
     useLayoutEffect(() => {
        // place the name of the App on right corner, the notification icon on left corner and the search bar bellow them
        navigation.setOptions({
          headerTitle: () => (<View
            style={styles.addToCartButton}
          >
            <Text style={{color:"#FF9900", fontSize:18 }}>Paramètres</Text>
          </View>),
          headerStyle: {
            backgroundColor: "white",
            borderBottomColor: "transparent",
            shadowColor: "transparent"
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
           headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10, }}>
                    <Icon name="arrow-back" size={24} color="#FF9900" />
                  </TouchableOpacity>
                ),
          
    
        });
      }, [navigation]);

      const user = auth().currentUser;
      const currentUserUid = auth().currentUser.uid;
      const [loading, setLoading] = useState(true);
  
      const [authUser, setAuthUser] = useState(null)
      const logout = () => {
          auth().signOut()
              .then(() => {
                  setAuthUser(null)
                  console.log("User signed Out");
                  navigation.navigate("LoginScreen")
  
              })
              .catch(error => {
                  console.log(error);
              });
          console.log('Logout button pressed')
      }
      //getUserData from fb
      useEffect(() => {
          getUserData();
      }, [])
      const [userData, setUserData] = useState([]);
      const getUserData = async () => {
          setLoading(true)
          try {
              const userRef = doc(db, "murnaShoppingUsers", currentUserUid);
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
      console.log("currentUserUid:", currentUserUid);
      console.log("userData name:", userData?.name);
      console.log("userData phoneNumber:", userData?.phoneNumber);
      console.log("userData address:", userData?.address);
    return (
        <View>

            <TouchableOpacity
                onPress={() => navigation.navigate("EditProfile", {
                    userData: userData,
                })}
                style={styles.textContainer}>
                    <Text style={styles.textTitle}> Modifier le profil </Text>
                    <Ionicons name="chevron-forward" size={24} color="#FF9900" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("VotreModePaiement", {
                    userData: userData,
                })}
                style={styles.textContainer}>
                    <Text style={styles.textTitle}> Votre mode de paiement </Text>
                    <Ionicons name="chevron-forward" size={24} color="#FF9900" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("LangueScreen", {
                    userData: userData,
                })}
                style={[styles.textContainer, {marginBottom:12, }] }>
                    <Text style={styles.textTitle}> Langue </Text>
                    <Ionicons name="chevron-forward" size={24} color="#FF9900" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("AproposCetteApplication", {
                    userData: userData,
                })}
                style={styles.textContainer }>
                    <Text style={styles.textTitle}> À propos de nous </Text>
                    <Ionicons name="chevron-forward" size={24} color="#FF9900" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("ConditionsJuridiquesPolitiques", {
                    userData: userData,
                })}
                style={styles.textContainer}>
                    <Text style={styles.textTitle}> Termes et conditions </Text>
                    <Ionicons name="chevron-forward" size={24} color="#FF9900" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => console.log("Share this app")}
                style={[styles.textContainer, {marginBottom:28, }] }>
                    <Text style={styles.textTitle}> Partagez l'application </Text>
                    <AntDesign name="sharealt" size={20} color="#FF9900" />
            </TouchableOpacity>
           
            

            <TouchableOpacity
                onPress={logout}
                style={styles.textContainer}

            >
                <Text style={styles.textTitle}>Logout</Text>
                <AntDesign name="logout" size={24} color="red" />
            </TouchableOpacity>
        </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    addToCartButton: {
        marginLeft:30
      },
      textContainer:{marginBottom:2, flexDirection:"row", justifyContent:"space-between", alignItems:"center", backgroundColor:"white", padding:8 },
      textTitle:{fontSize:16}
})