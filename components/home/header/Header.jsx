import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
const Header = () => {
    const navigation = useNavigation();

    //find the product searched from the search bar and display them in the FindScreen
    const [search, setSearch] = useState('')
    const handleSearch = () => {
        navigation.navigate('SearchResults', { search: search });
    }

    //navigation.navigate("notification")

    return (
            <View style={{width: "100%", flexDirection: "row", justifyContent: "space-between",  alignItems: "center", paddingVertical:8 }}>

                <Pressable
                    onPress={() => navigation.navigate("SearchScreen")}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 2,
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        borderWidth: 0.5,
                        borderColor: "orange",
                        borderRadius: 8,
                        backgroundColor: "white",
                    }}>
                    <AntDesign name="search1" size={20} color="black" />
                    <TextInput
                        placeholder='vêtements, sacs et chaussures...'
                        placeholderTextColor="gray"
                        editable={false}
                        style={{
                            paddingLeft: 6,
                            width: "80%",
                            fontSize: 15,
                            color: "green",
                            opacity: 0.8,
                        }}
                    />
                </Pressable>

                <TouchableOpacity onPress={() => console.log("Notification Clicked")
                }>
                    <Ionicons name="notifications-sharp" size={24} color="white" />
                </TouchableOpacity>

            </View>

    )
}

export default Header

const styles = StyleSheet.create({

})