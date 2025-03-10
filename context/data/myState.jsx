import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MyContext from './myContext'
import * as ImagePicker from 'expo-image-picker';


const myState = (props) => {

  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('light')

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }
  {/* Used to pick image*/ }

  const [images, setImages] = useState(null);
  // pick multiple images from gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: 'mixed',
      allowsMultipleSelection: true
    });
    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.error) {
      console.log('ImagePicker Error: ', result.error);
    } else {
      const { uri } = result;
      setImages(uri);
      console.log(result);
    }
  };

  return (
    <MyContext.Provider value={{loading, setLoading, mode, toggleMode, images, pickImage, setImages }}>
      {props.children}

    </MyContext.Provider>
  )
}

export default myState

