import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
    const navigation = useNavigation();
    const user = auth().currentUser;
    const [authUser, setAuthUser] = useState(null)
    const logout = () => {
        auth().signOut()
        .then(()=> {
            setAuthUser(null)
            console.log("User signed Out");
            navigation.navigate("LoginScreen")

        })
        .catch(error => {
            console.log(error);
            });
        console.log('Logout button pressed')
    }
  return (
    <View style={styles.container}>
        <View style={styles.subContainer}>
            <Text>Profile Screen</Text>
            <Image 
            source={{uri: user.photoURL}}
            style={{
                width: 60,
                height: 60,
                borderRadius: 50
            }}
            
            />
            <Text style={{textAlign:"center"}}>{user ? user.email : 'No User'}</Text>

            <TouchableOpacity 
            onPress={logout}
            style={{
                backgroundColor: 'red',
                padding: 10,
                borderRadius: 10,
                margin: 10
            }}
            
            >
                <Text style={{
                    color: 'white',
                    fontSize: 18,
                    textAlign:"center"
                }}>Logout</Text>
            </TouchableOpacity>
        </View>
      
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    subContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})