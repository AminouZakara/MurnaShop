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