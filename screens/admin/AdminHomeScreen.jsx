import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const AdminHomeScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        // place the name of the App on right corner, the notification icon on left corner and the search bar bellow them
        navigation.setOptions({
            headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Admin Home</Text >
                    </View>
                    <MaterialIcons name="add-a-photo" size={24} color="black" onPress={()=> navigation.navigate('AddNewProduct')} />
                    <TouchableOpacity onPress={() => console.log("Notification Clicked")
                    }>
                        <Ionicons name="notifications-sharp" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ),
            headerStyle: {
                backgroundColor: "#FF9900",
                borderBottomColor: "transparent",
                shadowColor: "transparent"
            },
        });
    }, [navigation]);
    const adminscreens = [
        { id: 1, name: "Active Products" },
        { id: 2, name: "Sold Products" },
        { id: 3, name: "Add Product" },
        { id: 4, name: "Orders" },
    ];

    const [selectedPanel, setSelectedPanel] = useState('Active Products')
    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{ paddingVertical: 10 }}
            >
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}

                    style={{
                        flexDirection: 'row',
                    }}>
                    {adminscreens.map((item, index) => (
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
                            <Text style={{
                                color: selectedPanel === item.name ? "#fff" : "#000",

                            }}>{item.name}</Text>
                        </TouchableOpacity>))}
                </ScrollView>
            </ScrollView>

            {/** if selectedPanel is add direct to add product screen */}

        </View>
    )
}

export default AdminHomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

    }
})