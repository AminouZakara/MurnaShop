import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import myContext from '../../../context/data/myContext';
import { Checkbox } from 'react-native-paper';
import { Timestamp} from 'firebase/firestore';


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

    const {
        // states
        loading, setLoading, mode, toggleMode,

        // Categories and their states
        categoryList, selectedCategory, setSelectedCategory, productFor, selectedItem, setSelectedItem,
        selectedProductFor, setSelectedProductFor, typeVetementFemme, typeVetementHomme, typeVetementFille,
        typeVetementGarcon, typeVetementBebe, chaussuresFemmeFille, chaussuresGarconHomme, electronicsCategories,
        maisonCategories, jewelryCategories, beautyCategories, stationaryCategories, sacsCategories,
        accsessoiresCategories,
        colors, selectedColors, setSelectedColors, toggleColor,
        sizes, shoesSizes, selectedSizes, setSelectedSizes, toggleSize,
        quantity, selectedQuantity, setSelectedQuantity,

        // Set Form data fuctions and their states
        pickImages, handleUploadPost, onSubmitMethod


        // Fetch data fuctions and their states


    } = context

    
  

    return (
        <>
            {
                loading ? (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : (
                    <ScrollView style={styles.container}>
                        {/** upload multiple images */}
                        <Formik
                            initialValues={{
                                status: "pending",
                                title: '',
                                description: '',
                                price: '',
                                category: '',
                                productFor: '',
                                productType: '',
                                quantity: '',
                                //userId: userId,
                                //userEmail: userEmail,
                                //userRole: userData?.role,
                                time: Timestamp.now(),
                                date: new Date().toLocaleString(
                                    "en-US",
                                    {
                                        month: "short",
                                        day: "2-digit",
                                        year: "numeric",
                                    }
                                ),

                            }}
                            onSubmit={(value => onSubmitMethod(value))}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, setFieldValue, }) => (
                                <View style={{ paddingHorizontal: 20, }}>
                                    {/*Image Picker*/}
                                    <View style={{ justifyContent: "space-between", }}>
                                        <TouchableOpacity
                                            onPress={pickImages}
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
                                    <View style={styles.pickerContainer}>
                                        <Picker
                                            selectedValue={selectedCategory}
                                            //enabled={!post ? true : false}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setFieldValue('category', itemValue),
                                                    setSelectedCategory(itemValue)
                                            }

                                            }
                                            style={styles.picker}
                                        >
                                            <Picker.Item label="Choisissez la categorie" value="" style={styles.pickerItems} />
                                            {categoryList.length > 0 && categoryList.map((item, index) => (
                                                item && <Picker.Item label={item.name} value={item.name} key={index} />
                                            ))}
                                        </Picker>

                                    </View>
                                    {/** if selectedCategory is vetements or chaussures then show productFor for user to select */}
                                    {selectedCategory === "Vêtements" || selectedCategory === "Chaussures" || selectedCategory === "Accsessoires" || selectedCategory === "Sacs" || selectedCategory === "Bijoux" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedProductFor}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productFor', itemValue)
                                                    setSelectedProductFor(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={selectedCategory + " pour"} value=""
                                                    style={styles.pickerItems} />
                                                {productFor.length > 0 && productFor.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>

                                    ) : null}
                                    {/** Électronique */}
                                    {selectedCategory === "Électronique" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Choisissez le type d'" + selectedCategory} value=""
                                                    style={styles.pickerItems} />
                                                {electronicsCategories.length > 0 && electronicsCategories.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}
                                    {/** maisonCategories */}
                                    {selectedCategory === "Maison" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Choisissez le type d'" + selectedCategory} value=""
                                                    style={styles.pickerItems} />
                                                {maisonCategories.length > 0 && maisonCategories.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}
                                    {/** Stationnaire */}
                                    {selectedCategory === "Stationnaire" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Choisissez le type d'" + selectedCategory} value=""
                                                    style={styles.pickerItems} />
                                                {stationaryCategories.length > 0 && stationaryCategories.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}

                                    {/** beautyCategories */}
                                    {selectedCategory === "Beauté" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Choisissez le type d'" + selectedCategory} value=""
                                                    style={styles.pickerItems} />
                                                {beautyCategories.length > 0 && beautyCategories.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}

                                    {/** jewelryCategories */}
                                    {selectedCategory === "Bijoux" && selectedProductFor === "Femme" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Choisissez le type d'" + selectedCategory} value=""
                                                    style={styles.pickerItems} />
                                                {jewelryCategories.length > 0 && jewelryCategories.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}
                                    {/** jewelryCategories */}
                                    {selectedCategory === "Bijoux" && selectedProductFor === "Homme" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Choisissez le type d'" + selectedCategory} value=""
                                                    style={styles.pickerItems} />
                                                {jewelryCategories.length > 0 && jewelryCategories.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}
                                    {/** jewelryCategories */}
                                    {selectedCategory === "Bijoux" && selectedProductFor === "Fille" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Choisissez le type d'" + selectedCategory} value=""
                                                    style={styles.pickerItems} />
                                                {jewelryCategories.length > 0 && jewelryCategories.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}
                                    {/** jewelryCategories */}
                                    {selectedCategory === "Bijoux" && selectedProductFor === "Garçon" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Choisissez le type d'" + selectedCategory} value=""
                                                    style={styles.pickerItems} />
                                                {jewelryCategories.length > 0 && jewelryCategories.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}



                                    {/** sacsCategories */}
                                    {selectedCategory === "Sacs" && selectedProductFor === "Femme" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Choisissez le type d'" + selectedCategory} value=""
                                                    style={styles.pickerItems} />
                                                {sacsCategories.length > 0 && sacsCategories.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}
                                    {/** sacsCategories */}
                                    {selectedCategory === "Sacs" && selectedProductFor === "Homme" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Choisissez le type d'" + selectedCategory} value=""
                                                    style={styles.pickerItems} />
                                                {sacsCategories.length > 0 && sacsCategories.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}
                                    {/** sacsCategories */}
                                    {selectedCategory === "Sacs" && selectedProductFor === "Fille" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Choisissez le type d'" + selectedCategory} value=""
                                                    style={styles.pickerItems} />
                                                {sacsCategories.length > 0 && sacsCategories.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}
                                    {/** sacsCategories */}
                                    {selectedCategory === "Sacs" && selectedProductFor === "Garçon" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Choisissez le type d'" + selectedCategory} value=""
                                                    style={styles.pickerItems} />
                                                {sacsCategories.length > 0 && sacsCategories.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}
                                    {/** accsessoiresCategories */}
                                    {selectedCategory === "Accsessoires" && selectedProductFor === "Femme" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Choisissez le type d'" + selectedCategory} value=""
                                                    style={styles.pickerItems} />
                                                {accsessoiresCategories.length > 0 && accsessoiresCategories.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}
                                    {/** accsessoiresCategories */}
                                    {selectedCategory === "Accsessoires" && selectedProductFor === "Homme" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Choisissez le type d'" + selectedCategory} value=""
                                                    style={styles.pickerItems} />
                                                {accsessoiresCategories.length > 0 && accsessoiresCategories.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}
                                    {/** accsessoiresCategories */}
                                    {selectedCategory === "Accsessoires" && selectedProductFor === "Fille" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Choisissez le type d'" + selectedCategory} value=""
                                                    style={styles.pickerItems} />
                                                {accsessoiresCategories.length > 0 && accsessoiresCategories.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}
                                    {/** accsessoiresCategories */}
                                    {selectedCategory === "Accsessoires" && selectedProductFor === "Garçon" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Choisissez le type d'" + selectedCategory} value=""
                                                    style={styles.pickerItems} />
                                                {accsessoiresCategories.length > 0 && accsessoiresCategories.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}

                                    {/** if selectedCategory is vetements and selectedItem is femme then show the types for user to select */}
                                    {selectedCategory === "Vêtements" && selectedProductFor === "Femme" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Type de vêtements pour Femme"} value=""
                                                    style={styles.pickerItems} />
                                                {typeVetementFemme.length > 0 && typeVetementFemme.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}
                                    {/** if selectedCategory is vetements and selectedItem is Homme then show the types for user to select */}
                                    {selectedCategory === "Vêtements" && selectedProductFor === "Homme" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Type de vêtements pour Homme"} value=""
                                                    style={styles.pickerItems} />
                                                {typeVetementHomme.length > 0 && typeVetementHomme.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}
                                    {/** if selectedCategory is vetements and selectedItem is Filles then show the types for user to select */}
                                    {selectedCategory === "Vêtements" && selectedProductFor === "Fille" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Type de vêtements pour Fille"} value=""
                                                    style={styles.pickerItems} />
                                                {typeVetementFille.length > 0 && typeVetementFille.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}

                                    {/** if selectedCategory is vetements and selectedItem is Filles then show the types for user to select */}
                                    {selectedCategory === "Vêtements" && selectedProductFor === "Garçon" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Type de vêtements pour Garçon"} value=""
                                                    style={styles.pickerItems} />
                                                {typeVetementGarcon.length > 0 && typeVetementGarcon.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}

                                    {/** if selectedCategory is Chaussures and selectedItem is Filles then show the types for user to select */}
                                    {selectedCategory === "Chaussures" && selectedProductFor === "Homme" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Type de Chaussures"} value=""
                                                    style={styles.pickerItems} />
                                                {chaussuresGarconHomme.length > 0 && chaussuresGarconHomme.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}
                                    {/** if selectedCategory is Chaussures and selectedItem is Filles then show the types for user to select */}
                                    {selectedCategory === "Chaussures" && selectedProductFor === "Garçon" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Type de Chaussures"} value=""
                                                    style={styles.pickerItems} />
                                                {chaussuresGarconHomme.length > 0 && chaussuresGarconHomme.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}

                                    {/** if selectedCategory is Chaussures and selectedItem is Filles then show the types for user to select */}
                                    {selectedCategory === "Chaussures" && selectedProductFor === "Femme" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Type de Chaussures"} value=""
                                                    style={styles.pickerItems} />
                                                {chaussuresFemmeFille.length > 0 && chaussuresFemmeFille.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}
                                    {/** if selectedCategory is Chaussures and selectedItem is Filles then show the types for user to select */}
                                    {selectedCategory === "Chaussures" && selectedProductFor === "Fille" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Type de Chaussures"} value=""
                                                    style={styles.pickerItems} />
                                                {chaussuresFemmeFille.length > 0 && chaussuresFemmeFille.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}



                                    {/** if selectedCategory is vetements and selectedItem is Bébé then show the types for user to select */}
                                    {selectedCategory === "Bébé" ? (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedItem}
                                                //enabled={!post ? true : false}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    setFieldValue('productType', itemValue)
                                                    setSelectedItem(itemValue)
                                                }
                                                }
                                                style={styles.picker}
                                            >
                                                <Picker.Item label={"Type de vêtements pour Bébé"} value=""
                                                    style={styles.pickerItems} />
                                                {typeVetementBebe.length > 0 && typeVetementBebe.map((item, index) => (
                                                    item && <Picker.Item label={item.name} value={item.name} key={index} />
                                                ))}
                                            </Picker>

                                        </View>
                                    ) : null}
                                    {/** if selectedCategory is Bébé and selectedItem exists show the colors */}
                                    {selectedCategory !== "Vêtements" && selectedCategory !== "Chaussures" && selectedItem ? (
                                        <View style={styles.checkboxContainer}>
                                            <Text style={styles.checkboxText}> {selectedColors.length > 0 ? "Couleurs sélectionnées : " : "Choisissez les couleurs "} </Text>
                                            {/* Selected Colors Display */}
                                            <View style={styles.selectedContainer}>
                                                {selectedColors.map((color) => {
                                                    const colorData = colors.find((c) => c.value === color);
                                                    return (
                                                        <View key={color} style={[styles.colorTag, { backgroundColor: colorData?.color }]}>
                                                            <Text style={styles.colorText}>{colorData?.label}</Text>
                                                        </View>
                                                    );
                                                })}
                                            </View>
                                            {/* Color List with Checkboxes */}
                                            <FlatList
                                                scrollEnabled={true}
                                                data={colors}
                                                numColumns={2}
                                                keyExtractor={(item) => item.value}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity onPress={() => toggleColor(item.value)} style={styles.item}>
                                                        <Checkbox status={selectedColors.includes(item.value) ? "checked" : "unchecked"} />
                                                        <View style={[styles.colorBox, { backgroundColor: item.color }]} />
                                                        <Text style={styles.colorLabelText}>{item.label}</Text>
                                                    </TouchableOpacity>
                                                )}
                                            />
                                        </View>
                                    ) : null}
                                    {/** if selectedCategory is Bébé and selectedItem vetements bebe show the colors */}
                                    {selectedCategory === "Bébé" && selectedItem === "Vêtements bébé fille" || selectedItem === "Vêtements bébé garçon" ? (
                                        <View style={styles.checkboxContainer}>
                                            <Text style={styles.checkboxText}> {selectedSizes.length > 0 ? "Tailles sélectionnées : " : "Choisissez les tailles "} </Text>

                                            {/* Selected Sizes Display */}
                                            <View style={styles.selectedContainer}>
                                                {selectedSizes.map((size) => (
                                                    <View key={size} style={styles.sizeTag}>
                                                        <Text style={styles.sizeText}>{size}</Text>
                                                    </View>
                                                ))}
                                            </View>

                                            {/* Size List with Checkboxes */}
                                            <FlatList
                                                data={sizes}
                                                numColumns={3}
                                                keyExtractor={(item) => item.value}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity onPress={() => toggleSize(item.value)} style={styles.item}>
                                                        <Checkbox status={selectedSizes.includes(item.value) ? "checked" : "unchecked"} />
                                                        <Text style={styles.sizeLabelText}>{item.label}</Text>
                                                    </TouchableOpacity>
                                                )}
                                            />
                                        </View>
                                    ) : null}




                                    {/** if selectedCategory, selectedItem and selectedSubItem exist and selectedItem is vetements then show colors in a checkbox for user to select as many as they want */}
                                    {selectedCategory && selectedProductFor && selectedItem && selectedCategory === "Vêtements" ? (
                                        <View style={styles.checkboxContainer}>
                                            <Text style={styles.checkboxText}> {selectedColors.length > 0 ? "Couleurs sélectionnées : " : "Choisissez les couleurs "} </Text>
                                            {/* Selected Colors Display */}
                                            <View style={styles.selectedContainer}>
                                                {selectedColors.map((color) => {
                                                    const colorData = colors.find((c) => c.value === color);
                                                    return (
                                                        <View key={color} style={[styles.colorTag, { backgroundColor: colorData?.color }]}>
                                                            <Text style={styles.colorText}>{colorData?.label}</Text>
                                                        </View>
                                                    );
                                                })}
                                            </View>
                                            {/* Color List with Checkboxes */}
                                            <FlatList
                                                scrollEnabled={true}
                                                data={colors}
                                                numColumns={2}
                                                keyExtractor={(item) => item.value}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity onPress={() => toggleColor(item.value)} style={styles.item}>
                                                        <Checkbox status={selectedColors.includes(item.value) ? "checked" : "unchecked"} />
                                                        <View style={[styles.colorBox, { backgroundColor: item.color }]} />
                                                        <Text style={styles.colorLabelText}>{item.label}</Text>
                                                    </TouchableOpacity>
                                                )}
                                            />
                                        </View>
                                    ) : null}

                                    {/** if selectedCategory, selectedItem and selectedSubItem exist and selectedItem is vetements then show colors in a checkbox for user to select as many as they want */}
                                    {selectedCategory && selectedProductFor && selectedItem && selectedCategory === "Chaussures" ? (
                                        <View style={styles.checkboxContainer}>
                                            <Text style={styles.checkboxText}> {selectedColors.length > 0 ? "Couleurs sélectionnées : " : "Choisissez les couleurs "} </Text>
                                            {/* Selected Colors Display */}
                                            <View style={styles.selectedContainer}>
                                                {selectedColors.map((color) => {
                                                    const colorData = colors.find((c) => c.value === color);
                                                    return (
                                                        <View key={color} style={[styles.colorTag, { backgroundColor: colorData?.color }]}>
                                                            <Text style={styles.colorText}>{colorData?.label}</Text>
                                                        </View>
                                                    );
                                                })}
                                            </View>
                                            {/* Color List with Checkboxes */}
                                            <FlatList
                                                scrollEnabled={true}
                                                data={colors}
                                                numColumns={2}
                                                keyExtractor={(item) => item.value}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity onPress={() => toggleColor(item.value)} style={styles.item}>
                                                        <Checkbox status={selectedColors.includes(item.value) ? "checked" : "unchecked"} />
                                                        <View style={[styles.colorBox, { backgroundColor: item.color }]} />
                                                        <Text style={styles.colorLabelText}>{item.label}</Text>
                                                    </TouchableOpacity>
                                                )}
                                            />
                                        </View>
                                    ) : null}

                                    {/** if selectedCategory, selectedItem and selectedSubItem exist and selectedItem is vetements then show sizes in a checkbox for user to select as many as they want */}
                                    {selectedCategory && selectedProductFor && selectedItem && selectedColors.length > 0 && selectedCategory === "Vêtements" ? (
                                        <View style={styles.checkboxContainer}>
                                            <Text style={styles.checkboxText}> {selectedSizes.length > 0 ? "Tailles sélectionnées : " : "Choisissez les tailles "} </Text>

                                            {/* Selected Sizes Display */}
                                            <View style={styles.selectedContainer}>
                                                {selectedSizes.map((size) => (
                                                    <View key={size} style={styles.sizeTag}>
                                                        <Text style={styles.sizeText}>{size}</Text>
                                                    </View>
                                                ))}
                                            </View>

                                            {/* Size List with Checkboxes */}
                                            <FlatList
                                                data={sizes}
                                                numColumns={3}
                                                keyExtractor={(item) => item.value}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity onPress={() => toggleSize(item.value)} style={styles.item}>
                                                        <Checkbox status={selectedSizes.includes(item.value) ? "checked" : "unchecked"} />
                                                        <Text style={styles.sizeLabelText}>{item.label}</Text>
                                                    </TouchableOpacity>
                                                )}
                                            />
                                        </View>
                                    ) : null}
                                    {/** if selectedCategory, selectedItem and selectedSubItem exist and selectedItem is vetements then show shoessizes in a checkbox for user to select as many as they want */}
                                    {selectedCategory && selectedProductFor && selectedItem && selectedColors.length > 0 && selectedCategory === "Chaussures" ? (
                                        <View style={styles.checkboxContainer}>
                                            <Text style={styles.checkboxText}> {selectedSizes.length > 0 ? "Tailles sélectionnées : " : "Choisissez les tailles "} </Text>

                                            {/* Selected Sizes Display */}
                                            <View style={styles.selectedContainer}>
                                                {selectedSizes.map((size) => (
                                                    <View key={size} style={styles.sizeTag}>
                                                        <Text style={styles.sizeText}>{size}</Text>
                                                    </View>
                                                ))}
                                            </View>

                                            {/* Size List with Checkboxes */}
                                            <FlatList
                                                data={shoesSizes}
                                                numColumns={3}
                                                keyExtractor={(item) => item.value}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity onPress={() => toggleSize(item.value)} style={styles.item}>
                                                        <Checkbox status={selectedSizes.includes(item.value) ? "checked" : "unchecked"} />
                                                        <Text style={styles.sizeLabelText}>{item.label}</Text>
                                                    </TouchableOpacity>
                                                )}
                                            />
                                        </View>
                                    ) : null}




                                    {/** number of the items in the storage */}
                                    <View style={styles.pickerContainer}>
                                        <Text style={styles.checkboxText}>Nombre de produits dans le stockage</Text>

                                        <Picker
                                            selectedValue={selectedQuantity}
                                            //enabled={!post ? true : false}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setFieldValue('quantity', itemValue),
                                                    setSelectedQuantity(itemValue)
                                            }

                                            }
                                            style={styles.picker}
                                        >
                                            <Picker.Item label="Nombre total de produits dans le stockage" value="" style={styles.pickerItems} />
                                            {quantity.length > 0 && quantity.map((item, index) => (
                                                item && <Picker.Item label={item} value={item} key={index} />
                                            ))}
                                        </Picker>

                                    </View>



                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#FF9900',
                                            padding: 10,
                                            padding: isSubmitting ? 8 : 13,
                                            borderRadius: 10,
                                            marginTop: 20,
                                            marginBottom: 50

                                        }}
                                        onPress={handleSubmit}
                                        disabled={isSubmitting}
                                    >
                                        {
                                            isSubmitting ? <ActivityIndicator size="small" color="#fff" /> : (
                                                <Text style={styles.buttonText}>Ajouter</Text>
                                            )
                                        }

                                    </TouchableOpacity>
                                </View>
                            )
                            }

                        </Formik >


                    </ScrollView >
                )
            }
        </>

    )
}

export default AddNewProduct

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#1F2937',
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

    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: "center"
    },
    pickerContainer: {
        backgroundColor: "#4B5563",
        paddingHorizontal: 10,
        borderWidth: 0.8,
        borderColor: 'grey',
        borderRadius: 10,
        marginTop: 15
    },
    picker: {
        color: 'white',
        fontSize: 18
    },
    pickerItems: {
        color: 'gray',
        fontSize: 18
    },
    checkboxContainer: {
        backgroundColor: "#9CA3AF",
        paddingHorizontal: 10,
        borderWidth: 0.8,
        borderColor: 'grey',
        borderRadius: 10,
        marginTop: 15
    },
    checkboxText: {
        color: 'white',
        fontSize: 16,
        marginVertical: 5
    },
    selectedContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 10,
    },
    colorTag: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginRight: 5,
        marginBottom: 5,
    },
    colorText: {
        color: "#fff",
        fontWeight: "bold",
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        marginHorizontal: 15,
    },
    colorBox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        marginLeft: 4,
    },
    colorLabelText: {
        fontSize: 16,
        color: "white",
        marginHorizontal: 30,
        marginLeft: 4,
    },
    //size
    selectedContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 10,
    },
    sizeTag: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: "#007BFF",
        marginRight: 5,
        marginBottom: 5,
    },
    sizeText: {
        color: "#fff",
        fontWeight: "bold",
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    sizeLabelText: {
        fontSize: 16,
        marginLeft: 0,
        color: "white",
        marginHorizontal: 30
    },
})