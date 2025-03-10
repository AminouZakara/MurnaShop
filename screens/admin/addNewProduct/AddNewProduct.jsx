import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import myContext from '../../../context/data/myContext';
import * as ImagePicker from 'expo-image-picker';


const AddNewProduct = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text style={{ fontSize: 20, color: '#fff' }}>Ajouter Un Nouveau Produit</ Text>
                </View>
            ),
            headerStyle: {
                backgroundColor: "#FF9900",
                borderBottomColor: "transparent",
                shadowColor: "transparent",

            },
        });
    }, [navigation]);
    const context = useContext(myContext)

    const { mode, toggleMode, image, pickImage, setImage } = context

    console.log("Mode ", mode);


    const categoryList = [
        { id: 1, name: 'Vêtements' },
        { id: 2, name: 'Beauté' },
        { id: 3, name: 'Bijoux' },
        { id: 4, name: 'Accsessoires' },
        { id: 5, name: 'Chaussures' },
        { id: 6, name: 'Sacs' },
        { id: 7, name: 'Électronique' },
        { id: 8, name: 'Maison' },
        { id: 9, name: 'Stationnaire' },
    ]
    const [selectedCategory, setSelectedCategory] = useState(null);
    const productFor = [
        { id: 1, name: 'Homme' },
        { id: 2, name: 'Femme' },
        { id: 3, name: 'Fille' },
        { id: 4, name: 'Garçon' },
        { id: 5, name: 'Bébé fille' },
        { id: 6, name: 'Bébé garçon' },
    ]
    const [selectedItem, setSelectedItem] = useState(null);

    const electronicsCategories = [
        { id: 1, name: 'Téléphone' },
        { id: 2, name: 'Tablette' },
        { id: 3, name: 'Ordinateur portable' },
        { id: 4, name: 'Ordinateur de bureau' },
        { id: 5, name: 'Scanner et photocopieuse' },
        { id: 6, name: 'Caméra' },
        { id: 7, name: 'Écouteurs' },
        { id: 8, name: 'Réfrigérateur' },
        { id: 9, name: 'Congélateur' },
        { id: 10, name: 'Fontaine à eau' },
        { id: 12, name: 'Machine à laver' },
        { id: 13, name: 'Lave-vaisselle' },
        { id: 14, name: 'Séchoir' },
        { id: 15, name: 'climatisation' },
        { id: 16, name: 'Télévision' },
        { id: 17, name: 'Mixeur' },
        { id: 18, name: 'Friteuse à air' },
        { id: 19, name: 'Four et micro-onde' },
        { id: 20, name: 'Four encastrable' },
        { id: 21, name: 'Fer à repasser' },
        { id: 22, name: 'Fer à lisser' },
        { id: 23, name: 'Aspirateur' },
        { id: 24, name: 'Sèche-cheveux' },
        { id: 25, name: 'Radio-audio et baffle' },
        { id: 26, name: "Accessoires d'ordinateur" },
        { id: 27, name: "Accessoires de tablette" },
        { id: 28, name: "Accessoires de téléphone" },
        { id: 29, name: "Accessoires de caméra" },
        { id: 30, name: 'Power bank et batteries' },
        { id: 31, name: 'Multiprises' },
        { id: 32, name: 'Stockage de données' },
        { id: 33, name: 'Jeux vidéos' },
        { id: 34, name: 'Éclair' },
        { id: 35, name: 'Autre' },
    ]


    const onSubmitMethod = () => {
        console.log(selectedCategory)
        console.log(selectedItem)
    }
    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    status: "pending",
                    title: '',
                    description: '',
                    price: '',
                    category: '',
                    postType: '',

                    region: '',
                    city: '',
                    town: '',
                    //neighborhood: post ? post.neighborhood : '',
                    // address: post ? post.address : '',
                    image: '',
                    createdAt: Date.now()
                }}
                onSubmit={(value => onSubmitMethod(value))}
            >
                {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, }) => (
                    <View style={{ padding: 10, }}>
                        {/*Image Picker*/}
                        <View style={{ justifyContent: "space-between", }}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={pickImage}
                            >
                                <Image
                                    source={require("../../../assets/images/placeholder.jpg")}
                                    style={styles.image}
                                />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            placeholderTextColor={"#E5E7EB"}
                            style={styles.input}
                            placeholder="Title"
                            onChangeText={handleChange('title')}
                            onBlur={handleBlur('title')}
                            value={values?.title}
                        //editable={!post ? true : false}
                        />
                        <TextInput
                            placeholderTextColor={"#E5E7EB"}

                            style={[styles.input, { height: 150, textAlignVertical: "top" }]}
                            placeholder="Description"
                            onChangeText={handleChange('description')}
                            onBlur={handleBlur('description')}
                            multiline

                            value={values?.description}
                        />
                        <TextInput
                            placeholderTextColor={"#E5E7EB"}
                            style={styles.input}
                            placeholder="Price"
                            keyboardType="numeric"
                            onChangeText={handleChange('price')}
                            onBlur={handleBlur('price')}
                            value={values?.price}
                        />
                        {/* Categories Dropdown List with picker*/}
                        <View style={{
                            backgroundColor: "#4B5563",
                            paddingHorizontal: 10,
                            borderWidth: 0.8,
                            borderColor: 'grey',
                            borderRadius: 10,
                            marginTop: 15
                        }}>
                            <Picker
                                selectedValue={selectedCategory}
                                //enabled={!post ? true : false}
                                onValueChange={(itemValue, itemIndex) => {
                                    setFieldValue('category', itemValue),
                                        setSelectedCategory(itemValue)
                                }

                                }
                                style={{ color: '#E5E7EB', }}
                            >
                                <Picker.Item label="Choisissez la categorie" value="" style={{
                                    color: 'grey',
                                    fontSize: 18

                                }} />
                                {categoryList.length > 0 && categoryList.map((item, index) => (
                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                ))}
                            </Picker>

                        </View>
                        {/** if selectedCategory is vetements or chaussures then show productFor for user to select */}
                        {selectedCategory === "Vêtements" || selectedCategory === "Chaussures" ? (
                            <View style={{
                                backgroundColor: "#4B5563",
                                paddingHorizontal: 10,
                                borderWidth: 0.8,
                                borderColor: 'grey',
                                borderRadius: 10,
                                marginTop: 15
                            }}>
                                <Picker
                                    selectedValue={selectedItem}
                                    //enabled={!post ? true : false}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setFieldValue('category', itemValue)
                                        setSelectedItem(itemValue)

                                    }

                                    }
                                    style={{ color: '#E5E7EB', }}
                                >
                                    <Picker.Item label={selectedCategory + " pour"} value="" style={{
                                        color: 'grey',
                                        fontSize: 18

                                    }} />
                                    {productFor.length > 0 && productFor.map((item, index) => (
                                        item && <Picker.Item label={item.name} value={item.name} key={index} />
                                    ))}
                                </Picker>

                            </View>

                        ) : null}

                        {selectedCategory === "Électronique" ? (
                            <View style={{
                                backgroundColor: "#4B5563",
                                paddingHorizontal: 10,
                                borderWidth: 0.8,
                                borderColor: 'grey',
                                borderRadius: 10,
                                marginTop: 15
                            }}>
                                <Picker
                                    selectedValue={selectedItem}
                                    //enabled={!post ? true : false}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setFieldValue('category', itemValue)
                                        setSelectedItem(itemValue)


                                    }

                                    }
                                    style={{ color: '#E5E7EB', }}
                                >
                                    <Picker.Item label={"Choisissez le type d'" + selectedCategory} value="" style={{
                                        color: 'grey',
                                        fontSize: 18

                                    }} />
                                    {electronicsCategories.length > 0 && electronicsCategories.map((item, index) => (
                                        item && <Picker.Item label={item.name} value={item.name} key={index} />
                                    ))}
                                </Picker>

                            </View>
                        ) : null}



                        <TouchableOpacity
                            style={{
                                backgroundColor: '#FF9900',
                                padding: 10,
                                //padding: isSubmitting ? 8 : 13,
                                borderRadius: 10,
                                marginTop: 20

                            }}
                            onPress={handleSubmit}
                        //disabled={isSubmitting}
                        >
                            <Text style={styles.buttonText}>Submit</Text>

                        </TouchableOpacity>
                    </View>
                )}

            </Formik>


        </View>
    )
}

export default AddNewProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F2937'
    },
    image: {
        width: 150,
        height: 140,
        borderRadius: 15,
        resizeMode: "contain",
    },
    input: {
        backgroundColor: "#4B5563",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderColor: 'gray',
        borderWidth: 0.4,
        borderRadius: 10,
        fontSize: 18,
        marginTop: 15,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: "center"
    },
    picker: {
        paddingHorizontal: 16,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 18,
        marginTop: 10,
        marginBottom: 5
    }
})