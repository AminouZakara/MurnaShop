import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/home/header/Header';

const FavoriteScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    // place the name of the App on right corner, the notification icon on left corner and the search bar bellow them
    navigation.setOptions({
      headerTitle: () => <Header />,
      headerStyle: {
        backgroundColor: "#FF9900",
        borderBottomColor: "transparent",
        shadowColor: "transparent"
      },
    });
  }, [navigation]);
  return (
    <View>
      <Text>FavoriteScreen</Text>
    </View>
  )
}

export default FavoriteScreen

const styles = StyleSheet.create({})