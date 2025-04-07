import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";



const MyOrder = () => {
    const navigation = useNavigation()
        useLayoutEffect(() => {
           // place the name of the App on right corner, the notification icon on left corner and the search bar bellow them
           navigation.setOptions({
             headerTitle: () => (<View
               style={{marginLeft:30}}
             >
               <Text style={{color:"#FF9900", fontSize:18 }}>Mes Commandes</Text>
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
  return (
    <View>
      <Text>Mes Commandes</Text>
    </View>
  )
}

export default MyOrder

const styles = StyleSheet.create({
   
})