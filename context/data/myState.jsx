import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MyContext from './myContext'
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, getDocs, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import { app, db } from '../../firebaseConfig';
import { firebase } from '@react-native-firebase/auth';
import { useEffect } from 'react';



const myState = (props) => {
  
  
  // states -> 
  // Form data Categories and their states -> 
  // Set data fuctions and their states
  // Fetch data fuctions and their states

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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const productFor = [
    { id: 1, name: 'Homme' },
    { id: 2, name: 'Femme' },
    { id: 3, name: 'Fille' },
    { id: 4, name: 'Garçon' },
  ]
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedProductFor, setSelectedProductFor] = useState(null);
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
  const [selectedColors, setSelectedColors] = useState([]);
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

  const [selectedSizes, setSelectedSizes] = useState([]);

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  //select number of items in the storage
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const quantity = Array.from({ length: 1000 }, (_, i) => i + 100);
  {/* -------- End of Form data Categories and their states ----------------- Form data Categories and their states ---------------*/ }




  {/* --------Start of Set Form data fuctions and their states ----------------- Set data fuctions and their states ---------------*/ }
  const [submitting, setSubmitting] = useState(false);
  const uploadImagesAndSaveData = async (images, formData) => {
    setSubmitting(true);
    try {
      const storage = getStorage(app);

      const uploadPromises = images.map(async (image) => {
        const response = await fetch(image.uri);
        const blob = await response.blob();

        const filename = `murnaShoppingPostsImages/${Date.now()}_${Math.random().toString(36).substring(7)}`;
        const storageRef = ref(storage, filename);

        await uploadBytes(storageRef, blob);
        return getDownloadURL(storageRef);
      });

      // Wait for all images to upload and retrieve URLs
      const imageUrls = await Promise.all(uploadPromises);

      // Save form data with image URLs to Firestore
      await addDoc(collection(db, "murnaShoppingPosts"), {
        ...formData,
        images: imageUrls,
        colors: selectedColors,
        sizes: selectedSizes,
        createdAt: new Date()
      });
      setSubmitting(false)
      console.log("Form data with images saved successfully with these data:",
        formData, selectedColors, selectedSizes, imageUrls);
      setSelectedImages([]);
      setSelectedColors([]);
      setSelectedSizes([]);
      setSelectedQuantity(1);
      formData.title = '',
        formData.description = '',
        formData.price = '',
        formData.category = ''

    } catch (error) {
      console.error("Error uploading images and data:", error);
      setSubmitting(false)
      console.log("Error:", error);

    }
  };

  const [selectedImages, setSelectedImages] = useState([]);
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true, // Enable multiple selection
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages(result.assets);
      //console.log("image num:", result.assets.length);


      //return result.assets.map(asset => ({ uri: asset.uri }));
    }
  };

  const onSubmitMethod = async (formData) => {

    if (selectedImages.length > 0 && selectedColors.length > 0 || selectedSizes.length > 0 && selectedQuantity > 1 &&
      formData.title !== '' && formData.description !== '' && formData.price !== '' && formData.category !== '') {
      await uploadImagesAndSaveData(selectedImages, formData);
    } else {
      Alert.alert(
        "Erreur",
        "Veuillez remplir tous les champs obligatoires",
        [{ text: "OK" }]
      );
      console.log("No data to save, please fill all required fields");
    }
  };

  const onSubmitMethodfff = () => {
    console.log("Category:", selectedCategory)
    console.log("product for:", selectedProductFor)
    console.log("Product Type:", selectedItem)
    console.log("Num of selected Colors:", selectedColors.length);
    console.log("Selected Colors:", selectedColors);
    console.log("Num of selected sizes:", selectedSizes.length);
    console.log("Selected sizes:", selectedSizes);
    console.log("Selected quantity:", selectedQuantity);
  }
  {/* -------- End of Set Form data fuctions and their states ----------------- Set data fuctions and their states ---------------*/ }



  {/* --------Start of Fetch data fuctions and their states ----------------- Set data fuctions and their states ---------------*/ }
  //UseEffect
  useEffect(() => {
   
    getAllProducts();

  }, []);
 
  // get all Products
  const [allProducts, setAllProducts] = useState([]);
  const getAllProducts = async () => {
    setLoading(true)
    try {
      const q = query(collection(db, "murnaShoppingPosts"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setAllProducts(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }





  {/* --------End of Fetch data fuctions and their states ----------------- Set data fuctions and their states ---------------*/ }

  return (
    <MyContext.Provider value={{
     
      // states
      loading, setLoading, mode, toggleMode,

      //Categories and their states
      categoryList, selectedCategory, setSelectedCategory, productFor, selectedItem, setSelectedItem,
      selectedProductFor, setSelectedProductFor, typeVetementFemme, typeVetementHomme, typeVetementFille,
      typeVetementGarcon, typeVetementBebe, chaussuresFemmeFille, chaussuresGarconHomme, electronicsCategories,
      maisonCategories, jewelryCategories, beautyCategories, stationaryCategories, sacsCategories,
      accsessoiresCategories,
      colors, selectedColors, setSelectedColors, toggleColor,
      sizes, shoesSizes, selectedSizes, setSelectedSizes, toggleSize,
      quantity, selectedQuantity, setSelectedQuantity,

      //Form data fuctions
      pickImages, onSubmitMethod,

      //Fetch data fuctions 
      allProducts



    }}>
      {props.children}

    </MyContext.Provider>
  )
}

export default myState

