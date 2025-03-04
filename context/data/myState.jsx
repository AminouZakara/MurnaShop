import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MyContext from './myContext'

const myState = (props) => {
const [mode, setMode] = useState('light')
  return (
    <MyContext.Provider value={{mode} }>
       {props.children}
    </MyContext.Provider>
  )
}

export default myState

