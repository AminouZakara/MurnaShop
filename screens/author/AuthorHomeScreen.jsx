import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { getUserRole } from '../../Shared/Services'
import auth from '@react-native-firebase/auth'


const AuthorHomeScreen = () => {
    const navigation = useNavigation()
   
useEffect(() => {
  const unsubscribe = auth().onAuthStateChanged(async (user) => {
    if (user) {
      const role = await getUserRole(user.uid);
      if (role === 'author') {
        // Do nothing or navigate to AuthorHome if needed
        console.log("Author logged in");
      } else {
        navigation.replace('Main');
      }
    } else {
      navigation.replace('Login'); // Optional: handle unauthenticated users
    }
  });

  return () => unsubscribe();
}, []);
  return (
    <View>
      <Text>Author Home Screen</Text>
      <TouchableOpacity 
      onPress={()=> navigation.navigate("AddLocations")}
      style={{
        marginTop: 30,
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10,
        margin: 10
    }}
      >
        <Text style={{
            color: 'white',
            fontSize: 20,
            textAlign: "center"
        }}>Add locations</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AuthorHomeScreen

const styles = StyleSheet.create({})