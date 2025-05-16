import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { getUserRole } from '../../Shared/Services'
import auth from '@react-native-firebase/auth'
import ClientUsers from './authorComponents/typeOfUsers/ClientUsers'
import CargaisonUsers from './authorComponents/typeOfUsers/CargaisonUsers'
import AdminUsers from './authorComponents/typeOfUsers/AdminUsers'


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

  const [selectedPanel, setSelectedPanel] = React.useState('Users')

  const usersScreens = [
    { id: 1, name: "Users" },
    { id: 2, name: "Cargaisons" },
    { id: 3, name: "Admins" },
  ]
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ marginLeft: 30, }}>
          <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", }}>Author Panel</Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: "#FF9900",
        borderBottomColor: "transparent",
        shadowColor: "transparent"
      },
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 18,
      },
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          {usersScreens.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedPanel(item.name)}
              style={{
                backgroundColor: selectedPanel === item.name ? "#FF9900" : "#fff",
                paddingVertical: 4,
                paddingHorizontal: 10,
                margin: 10,
                borderRadius: 5,

              }}>
              <Text style={[styles.buttonText, { color: selectedPanel === item.name ? "black" : "#000" }]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedPanel === 'Users' && (<ClientUsers />)}
        {selectedPanel === 'Cargaisons' && (<CargaisonUsers />)}
        {selectedPanel === 'Admins' && (<AdminUsers />)}
    </View >
  )
}

export default AuthorHomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})