import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const AuthorHomeScreen = () => {
    const navigation = useNavigation()
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