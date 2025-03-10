import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const SubSubCategoryProp = ({ subSubCategories, selectedSubCategory, setSelectedSubCategory }) => {
    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{
                flexDirection: 'row',
                marginTop: 8,
                elevation: 1,
                backgroundColor: '#fff',
                paddingVertical: 8,
            }}>
            {subSubCategories.map((category, index) => (
                <TouchableOpacity
                    style={{
                        paddingRight: 10,
                        paddingVertical: 4,
                        paddingHorizontal: 8,
                        marginHorizontal: 8,
                        borderRadius: 8,
                        borderWidth: 0.8,
                        borderColor: '#ccc',
                        //if the item is selected, change the color
                        backgroundColor: selectedSubCategory === category.name ? 'orange' : '#fff',
                    }}
                    onPress={() => { setSelectedSubCategory(category.name) }}
                >
                    <Text style={{fontSize:12, color: selectedSubCategory === category.name ? '#fff' : '#000 ' }}>{category.name}</Text>
                </TouchableOpacity>
            ))}

        </ScrollView>
    )
}

export default SubSubCategoryProp

const styles = StyleSheet.create({})