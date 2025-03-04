import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/home/Header';

const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    // place the name of the App on right corner, the notification icon on left corner and the search bar bellow them
    navigation.setOptions({
      headerTitle: () => <Header />,
      headerStyle: {
        backgroundColor: "blue",
        height: 100,
        borderBottomColor: "transparent",
        shadowColor: "transparent"
      },
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text>welcome to Flipex</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
})