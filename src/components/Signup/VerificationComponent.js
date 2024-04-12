import React, { useState, useContext } from "react";
import { Text, Button, Modal, View, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Data } from "../../utils/Store";
import axios from "axios";

export default function VerificationComponent({ visibleVerification, setVisibleVerification }) {
  const { text, onChangeText, setAuthenticated, setUsername } = useContext(Data);
  const [selectedImage, setSelectedImage] = useState(null);
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    if (selectedImage) {
      const updatedText = { ...text, registration_proof: "image.jpg" };
      onChangeText(updatedText);
      setVerified(true);
    } else {
      console.log("Please select an image for verification.");
    }
  };

  const handleImageSelection = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission denied to access media library");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      let trimmedImageUri = result.assets[0].uri;
      if (trimmedImageUri) {
        if (trimmedImageUri.includes(".jpg")) {
          trimmedImageUri = trimmedImageUri.split(".jpg")[0] + ".jpg";
        } else if (trimmedImageUri.includes(".png")) {
          trimmedImageUri = trimmedImageUri.split(".png")[0] + ".png";
        }
      }
      setSelectedImage(trimmedImageUri);
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting registration proof...");
    try {
      const response = await axios.post("http://192.168.1.13:3000/user/register", text);
      console.log("Response:", response.data);
      if (response.data.register) {
        setAuthenticated(false);
      } else {
        setAuthenticated(response.data.islogin);
      }
    } catch (err) {
      console.log("Error:", err);
      if (err.response) {
        console.log("Response data:", err.response.data);
        console.log("Response status:", err.response.status);
        console.log("Response headers:", err.response.headers);
      } else if (err.request) {
        // The request was made but no response was received
        console.log("No response received:", err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error setting up the request:", err.message);
      }
    }
  };

  return (
    <Modal
      visible={visibleVerification}
      onRequestClose={() => {
        setVisibleVerification(false);
      }}
      animationType="slide"
    >
      <View>
        <Text>Verification Component</Text>
        <View style={styles.imageContainer}>
          <Text>Please upload an image for verification</Text>
          <Button title="Select Image" onPress={handleImageSelection} />
          {!!selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
        </View>
        {!!selectedImage && !verified && <Button title="Verify" onPress={handleVerify} />}
        {!!verified && <Button title="Submit" onPress={handleSubmit} />}
        <Button
          title="Close"
          onPress={() => {
            setVisibleVerification(false);
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  errorBorder: {
    borderColor: "red",
  },
  error: {
    color: "red",
    marginBottom: 10,
    marginLeft: 12,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
});
