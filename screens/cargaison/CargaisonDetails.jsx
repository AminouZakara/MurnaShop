import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CargaisonDetails = () => {
    const navigation = useNavigation();
    const route = navigation.getState().routes;
    const cargaisonId = route[route.length - 1].params.cargaisonId;
    console.log("Cargaison ID:", cargaisonId);
     const cargaisonData = route[route.length - 1].params.cargaisonData;
    console.log("Cargaison data:", cargaisonData);
    
  return (
    <View>
      <Text>CargaisonDetails</Text>
    </View>
  )
}

export default CargaisonDetails

const styles = StyleSheet.create({})