import { ActivityIndicator, Alert, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import { Checkbox } from 'react-native-paper';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_CLOUD_NAME } from '@env';



const AddNewProduct = () => {
    const { userData } = useSelector(state => state.user);
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



    const route = useRoute();
    const product = route.params?.product

    console.log("post", product);
    const id = route.params?.id
    console.log("id", id)

    const isEditMode = !!product;


    {/* -------- states ----------------- states --------------------- states ------------------- states-------*/ }
    const [loading, setLoading] = useState(false)
    const [mode, setMode] = useState('light')

    const toggleMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light')
    }
    {/* --------end of the states ----------------- states --------------------- states ------------------- states-------*/ }



    {/* -------- Start of Form data Categories and their states ----------------- Form data Categories and their states ---------------*/ }
    const categoryList = [
        { id: 1, name: 'Bébé' },
        { id: 2, name: 'Vêtements' },
        { id: 3, name: 'Beauté' },
        { id: 4, name: 'Bijoux' },
        { id: 5, name: 'Accsessoires' },
        { id: 6, name: 'Chaussures' },
        { id: 7, name: 'Sacs' },
        { id: 8, name: 'Électronique' },
        { id: 9, name: 'Maison' },
        { id: 10, name: 'Stationnaire' },
    ]
    const [selectedCategory, setSelectedCategory] = useState(product?.category || '');
    const productFor = [
        { id: 1, name: 'Homme' },
        { id: 2, name: 'Femme' },
        { id: 3, name: 'Fille' },
        { id: 4, name: 'Garçon' },
    ]
    const [selectedItem, setSelectedItem] = useState(product?.productType || '');

    const [selectedProductFor, setSelectedProductFor] = useState(product?.productFor || '');


    //Type de vetements pour femme
    const typeVetementFemme = [
        { id: 2, name: 'Vêtement' },
        { id: 3, name: 'Sous-vêtes' },
        { id: 4, name: 'Vêtes de nuit' },
        { id: 5, name: 'Hijab' },
        { id: 6, name: 'Foulards' },
        { id: 7, name: 'Chemises' },
        { id: 8, name: 'T-shirts' },
        { id: 9, name: 'Pantalon' },
        { id: 9, name: 'Collants' },
        { id: 10, name: 'Gean' },
        { id: 11, name: 'Shorts' },
        { id: 12, name: 'Chaussettes' },
        { id: 13, name: 'Chap-Casquets' },
    ]
    // Type de vetements pour homme
    const typeVetementHomme = [
        { id: 2, name: 'Vêtement' },
        { id: 3, name: 'Chemises' },
        { id: 4, name: 'T-shirts' },
        { id: 5, name: 'Pantalon' },
        { id: 6, name: 'Gean' },
        { id: 6, name: 'Shorts' },
        { id: 7, name: 'Sous-vêtes' },
        { id: 8, name: 'Vêtes de nuit' },
        { id: 9, name: 'Cravates' },
        { id: 10, name: 'Chaussettes' },
        { id: 11, name: 'Chap-Casquets' },
    ]
    //Type de vetements pour fille
    const typeVetementFille = [
        { id: 2, name: 'Vêtement' },
        { id: 3, name: 'Sous-vêtes' },
        { id: 4, name: 'Vêtes de nuit' },
        { id: 5, name: 'Hijab' },
        { id: 6, name: 'Foulards' },
        { id: 7, name: 'Chemises' },
        { id: 8, name: 'T-shirts' },
        { id: 9, name: 'Pantalon' },
        { id: 10, name: 'Collants' },
        { id: 11, name: 'Gean' },
        { id: 12, name: 'Shorts' },
        { id: 13, name: 'Chaussettes' },
        { id: 14, name: 'Chap-Casquets' },

    ]
    //Type de vetements pour garçon
    const typeVetementGarcon = [
        { id: 2, name: 'Vêtement' },
        { id: 3, name: 'Chemises' },
        { id: 4, name: 'T-shirts' },
        { id: 5, name: 'Pantalon' },
        { id: 6, name: 'Gean' },
        { id: 7, name: 'Shorts' },
        { id: 8, name: 'Sous-vêtes' },
        { id: 9, name: 'Vêtes de nuit' },
        { id: 10, name: 'Cravates' },
        { id: 11, name: 'Chaussettes' },
        { id: 12, name: 'Chap-Casquets' },
    ]
    //Type de vetements pour bébé
    const typeVetementBebe = [
        { id: 2, name: 'Vêtements bébé fille' },
        { id: 3, name: 'Vêtements bébé garçon' },
        { id: 4, name: 'Chaussures bébé fille' },
        { id: 5, name: 'Chaussures bébé garçon' },
        { id: 6, name: 'Allaitement' },
        { id: 7, name: 'Poussette bébé' },
        { id: 8, name: 'Trotteur bébé' },
        { id: 9, name: 'Rangement bébé' },
        { id: 10, name: 'Jouets pour bébé' },
        { id: 11, name: 'Équipement voyage bébé' },
        { id: 12, name: 'Soins bébé' },
        { id: 13, name: 'Couches bébé' },
    ]
    //chaussures pour femme and fille
    const chaussuresFemmeFille = [
        { id: 2, name: 'Talon haut' },
        { id: 3, name: 'Talon bas' },
        { id: 4, name: 'Sandales' },
        { id: 5, name: 'Baskets' },
        { id: 8, name: 'Bottes' },
    ]
    //chaussures pour garçon and homme
    const chaussuresGarconHomme = [
        { id: 4, name: 'Sandales' },
        { id: 5, name: 'Baskets' },
        { id: 6, name: 'Crampons' },
        { id: 7, name: 'Souliers' },
        { id: 8, name: 'Bottes' },
    ]
    //electronics Categories
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
    ]
    //maison et jardin Categories
    const maisonCategories = [
        { id: 2, name: 'Chambre à coucher' },
        { id: 3, name: 'Cuisine' },
        { id: 4, name: 'Salle à manger' },
        { id: 5, name: 'Salon' },
        { id: 6, name: 'Toilettes' },
        { id: 7, name: 'Tapis' },
        { id: 8, name: 'Salle de bain' },
        { id: 9, name: 'Produits de nettoyage' },
    ]
    // stationary Categories
    const stationaryCategories = [
        { id: 2, name: 'Livres' },
        { id: 3, name: 'Cahiers' },
        { id: 4, name: 'Papier' },
        { id: 5, name: 'Stylos' },
        { id: 6, name: 'Crayons' },
    ]
    // jewlery Categories
    const jewelryCategories = [
        { id: 2, name: 'Alliances' },
        { id: 3, name: 'Bagues' },
        { id: 4, name: 'Bague-Fiançails' },
        { id: 5, name: 'Boucles' },
        { id: 6, name: 'Bracelets' },
        { id: 7, name: 'Colliers' },
        { id: 8, name: 'Gourmettes' },
        { id: 9, name: 'Lunettes' },
    ]
    // sacs Categories
    const sacsCategories = [
        { id: 2, name: 'Sacs à roulettes' },
        { id: 3, name: 'Sacs à dos' },
        { id: 4, name: 'Sacs de poitrine' },
        { id: 5, name: 'Sacs à main' },
        { id: 6, name: 'Portefeuille' },

    ]
    // accessories Categories
    const accsessoiresCategories = [
        { id: 2, name: 'Montres' },
        { id: 3, name: 'Lunettes' },
        { id: 4, name: 'Ceintures' },
        { id: 5, name: 'Foulards' },
        { id: 6, name: 'Chap-Casquets' },
        { id: 7, name: 'Cravates' },
        { id: 8, name: 'Hijab' },
        { id: 9, name: 'Chaussettes' },
    ]
    // beauty Categories
    const beautyCategories = [
        { id: 2, name: 'Maquillage' },
        { id: 3, name: 'Manu-Pédicure' },
        { id: 4, name: 'Outils de beauté' },
        { id: 5, name: 'Bain accessoires' },
        { id: 6, name: 'Perruques' },
        { id: 7, name: 'Rasage' },
        { id: 8, name: 'Pommade' },
        { id: 9, name: 'Shampooing' },
        { id: 10, name: 'Parfums' },
        { id: 11, name: 'Trous-toilette' },
    ]

    const colors = [
        { label: "Rouge", value: "red", color: "#FF0000" },
        { label: "Bleu", value: "blue", color: "#0000FF" },
        { label: "Noir", value: "black", color: "#000000" },
        { label: "Blanc", value: "white", color: "#FFFFFF" },
        { label: "Vert", value: "green", color: "#008000" },
        { label: "Jaune", value: "yellow", color: "#FFD700" },
        { label: "Violet", value: "purple", color: "#800080" },
        { label: "Orange", value: "orange", color: "#FFA500" },
        { label: "Marron", value: "brown", color: "#964B00" },
        { label: "Gris", value: "grey", color: "#808080" },
        { label: "Rose", value: "pink", color: "#FFC0CB" },
        { label: "Argent", value: "silver", color: "#B1B1B1" },
        { label: "Bronze", value: "bronze", color: "#CD7F32" },
        { label: "Champagne", value: "champagne", color: "#F2C464" },
        { label: "Cerise", value: "cerise", color: "#DE3163" },
        { label: "Coral", value: "coral", color: "#FF99CC" },
        { label: "Cyan", value: "cyan", color: "#00FFFF" },
        { label: "Foncé", value: "foncé", color: "#3B3F4E" },
        // { label: ""}
    ];
    const [selectedColors, setSelectedColors] = useState(product?.colors || []);
    const toggleColor = (color) => {
        setSelectedColors((prev) =>
            prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
        );
    };
    //Vetements sizes
    const sizes = [
        { label: "XS", value: "XS" },
        { label: "S", value: "S" },
        { label: "M", value: "M" },
        { label: "L", value: "L" },
        { label: "XL", value: "XL" },
        { label: "2XL", value: "2XL" },
        { label: "3XL", value: "3XL" },
        { label: "4XL", value: "4XL" },
        { label: "5XL", value: "5XL" },

    ];

    // Chaussures sizes from 15 to 45
    const shoesSizes = [
        { label: "15", value: "15" },
        { label: "16", value: "16" },
        { label: "17", value: "17" },
        { label: "18", value: "18" },
        { label: "19", value: "19" },
        { label: "20", value: "20" },
        { label: "21", value: "21" },
        { label: "22", value: "22" },
        { label: "23", value: "23" },
        { label: "24", value: "24" },
        { label: "25", value: "25" },
        { label: "26", value: "26" },
        { label: "27", value: "27" },
        { label: "28", value: "28" },
        { label: "29", value: "29" },
        { label: "30", value: "30" },
        { label: "31", value: "31" },
        { label: "32", value: "32" },
        { label: "33", value: "33" },
        { label: "34", value: "34" },
        { label: "35", value: "35" },
        { label: "36", value: "36" },
        { label: "37", value: "37" },
        { label: "38", value: "38" },
        { label: "39", value: "39" },
        { label: "40", value: "40" },
        { label: "41", value: "41" },
        { label: "42", value: "42" },
        { label: "43", value: "43" },
        { label: "44", value: "44" },
        { label: "45", value: "45" },
    ];

    const [selectedSizes, setSelectedSizes] = useState(product?.sizes || []);




    const toggleSize = (size) => {
        setSelectedSizes((prev) =>
            prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
        );
    };

    //select number of items in the storage
    const [selectedQuantity, setSelectedQuantity] = useState(product?.quantity || 1);
    const quantity = Array.from({ length: 1000 }, (_, i) => i + 100);
    {/* -------- End of Form data Categories and their states ----------------- Form data Categories and their states ---------------*/ }




    {/* --------Start of Set Form data fuctions and their states ----------------- Set data fuctions and their states ---------------*/ }
    const [submitting, setSubmitting] = useState(false);

    const [selectedImages, setSelectedImages] = useState(product?.images || []);
    const pickImages = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission denied', 'You need to allow access to the gallery.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
            allowsMultipleSelection: true,
        });

        if (!result.canceled) {
            setSelectedImages(result.assets.map(asset => asset.uri));
        }
    };


    const uploadImagesAndSaveData = async (productId, formValues) => {
        setSubmitting(true);

        try {
            if (selectedImages.length === 0) {
                Alert.alert('Image de Produit', "SVP choisissez au moins une image", [{ text: "OK" }]);
                setSubmitting(false);
                return;
            }

            const uploadedUrlsArray = [];

            for (let uri of selectedImages) {
                const fileName = uri.split('/').pop();
                const fileType = fileName?.split('.').pop();

                const cloudinaryData = new FormData();
                cloudinaryData.append('file', {
                    uri,
                    name: fileName,
                    type: `image/${fileType}`,
                });

                cloudinaryData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET); // <-- use string or import from .env
                cloudinaryData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

                try {
                    const res = await axios.post(
                        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                        cloudinaryData,
                        {
                            headers: { 'Content-Type': 'multipart/form-data' },
                        }
                    );
                    uploadedUrlsArray.push(res.data.secure_url);
                } catch (uploadErr) {
                    console.error("Cloudinary error:", uploadErr);
                    Alert.alert('Upload failed', 'Image upload to Cloudinary failed.');
                    setSubmitting(false);
                    return;
                }
            }

            if (uploadedUrlsArray.length === 0) {
                setSubmitting(false);
                return;
            }

            const postData = {
                ...formValues,
                images: uploadedUrlsArray,
                colors: selectedColors,
                sizes: selectedSizes,
                quantity: selectedQuantity,
                createdAt: new Date()
            };

            if (isEditMode && productId) {
                const docRef = doc(db, "murnaShoppingPosts", productId);
                await updateDoc(docRef, postData);
                Alert.alert("Succès", "Le post a été mis à jour avec succès !");
            } else {
                await addDoc(collection(db, "murnaShoppingPosts"), postData);
                Alert.alert("Succès", "Le post a été créé avec succès !");
            }

            // Reset
            setSelectedImages([]);
            setSelectedColors([]);
            setSelectedSizes([]);
            setSelectedQuantity(1);

        } catch (err) {
            console.error("Unexpected error:", err);
            Alert.alert("Erreur", "Une erreur est survenue lors de la sauvegarde.");
        } finally {
            setSubmitting(false);
        }
    };

    const onSubmitMethod = async (formValues) => {
        const required =
            selectedImages.length > 0 &&
            selectedColors.length > 0 &&
            selectedSizes.length > 0 &&
            selectedQuantity > 0 &&
            formValues.title &&
            formValues.description &&
            formValues.price &&
            formValues.category;

        if (!required) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires");
            console.log("Missing fields");
            return;
        }

        await uploadImagesAndSaveData(isEditMode ? product?.id : null, formValues);
    };




    console.log('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    console.log('cloud_name', CLOUDINARY_CLOUD_NAME);







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
                            enableReinitialize
                            initialValues={{
                                title: product?.title || '',
                                description: product?.description || '',
                                price: product?.price?.toString() || '',
                                category: product?.category || '',
                                productFor: product?.productFor || '',
                                productType: product?.productType || '',
                                productReview: product?.productReview || [],
                                quantity: product?.quantity?.toString() || '',
                                userId: userData?.userId,
                                storeId: userData?.userId,
                                storeName: userData?.storeName,
                                storeEmail: userData?.email,
                                storePhoneNumber: userData?.phoneNumber,
                                storeAddress: userData?.storeAddress,
                                storeCity: userData?.storeCity,
                                date: product?.date || new Date().toLocaleString("en-US", {
                                    month: "short", day: "2-digit", year: "numeric"
                                }),
                            }}
                            onSubmit={(values) => {
                                const payload = { ...values, images: selectedImages };
                                onSubmitMethod(payload, isEditMode ? product?.id : null);
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, setFieldValue, }) => (
                                <View style={{ paddingHorizontal: 20, }}>
                                    {/*Image Picker*/}
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <TouchableOpacity
                                            onPress={pickImages}
                                        >
                                            <Image
                                                source={require("../../../assets/images/placeholder.jpg")}
                                                style={styles.image}
                                            />
                                        </TouchableOpacity>
                                        {selectedImages.length > 0 && (
                                            <View style={styles.imagePreviewContainer}>
                                                <FlatList
                                                    style={{
                                                        marginRight: 60,
                                                        marginLeft: 15,
                                                    }}
                                                    data={selectedImages}
                                                    keyExtractor={(uri) => uri}
                                                    horizontal
                                                    showsHorizontalScrollIndicator={false}
                                                    renderItem={({ item: uri }) => (
                                                        <Image
                                                            source={{ uri }}
                                                            style={styles.previewImage}
                                                            resizeMode="cover"
                                                        />
                                                    )}
                                                />
                                            </View>
                                        )}
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
                                                <Text style={styles.buttonText}>
                                                    {isEditMode ? "Modifier" : "Ajouter"}
                                                </Text>
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
        width: 80,
        height: 80,
        borderRadius: 10,
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
        color: "white"
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
    imagePreviewContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    previewImage: {
        width: 80,
        height: 80,
        margin: 5,
        borderRadius: 8,
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