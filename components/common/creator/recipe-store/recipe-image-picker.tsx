import tw from "@/components/ui/tailwind";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

interface RecipeImagePickerProps {
  mainImage?: string;
  galleryImages?: string[];
  onMainImageChange: (uri: string) => void;
  onGalleryImageChange: (index: number, uri: string) => void;
  onRemoveGalleryImage?: (index: number) => void;
  error?: string;
}

export const RecipeImagePicker: React.FC<RecipeImagePickerProps> = ({
  mainImage,
  galleryImages = ["", "", "", ""],
  onMainImageChange,
  onGalleryImageChange,
  onRemoveGalleryImage,
  error,
}) => {
  const pickImage = async (type: "main" | "gallery", index?: number) => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Permission to access photo gallery is required to upload recipe images."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        if (type === "main") {
          onMainImageChange(uri);
        } else if (index !== undefined) {
          onGalleryImageChange(index, uri);
        }
      }
    } catch (err) {
      console.error("Image pick error:", err);
    }
  };

  // Ensure gallery has exactly 4 slots
  const slots = [0, 1, 2, 3].map((i) => galleryImages[i] || "");

  return (
    <View style={tw`w-full mb-5`}>
      {/* Main Image Box */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => pickImage("main")}
        style={[
          tw`w-full h-[180px] rounded-2xl overflow-hidden items-center justify-center border`,
          mainImage
            ? tw`border-[#E5E0D8] bg-gray-100`
            : tw`border-dashed border-[#D1CCC0] bg-[#F2EFE9]`,
        ]}
      >
        {mainImage ? (
          <View style={tw`relative w-full h-full`}>
            <Image
              source={{ uri: mainImage }}
              style={tw`w-full h-full`}
              resizeMode="cover"
            />
            <View
              style={tw`absolute top-3 right-3 bg-black/40 backdrop-blur-sm p-2 rounded-lg items-center justify-center`}
            >
              <MaterialCommunityIcons
                name="image-edit-outline"
                size={20}
                color="#FFFFFF"
              />
            </View>
          </View>
        ) : (
          <View style={tw`items-center justify-center`}>
            <View style={tw`w-14 h-14 rounded-2xl bg-white/80 items-center justify-center shadow-sm mb-1`}>
              <Ionicons name="image-outline" size={28} color="#5B7553" />
            </View>
          </View>
        )}
      </TouchableOpacity>

      {/* Thumbnail Gallery Row (4 slots) */}
      <View style={tw`flex-row justify-between items-center mt-3`}>
        {slots.map((imgUri, index) => (
          <TouchableOpacity
            key={`thumb-${index}`}
            activeOpacity={0.85}
            onPress={() => pickImage("gallery", index)}
            style={[
              tw`w-[22.5%] aspect-square rounded-xl overflow-hidden items-center justify-center border`,
              imgUri
                ? tw`border-[#E5E0D8] bg-gray-100`
                : tw`border-dashed border-[#D1CCC0] bg-[#F2EFE9]`,
            ]}
          >
            {imgUri ? (
              <View style={tw`relative w-full h-full`}>
                <Image
                  source={{ uri: imgUri }}
                  style={tw`w-full h-full`}
                  resizeMode="cover"
                />
                <View
                  style={tw`absolute top-1.5 right-1.5 bg-black/40 p-1 rounded-md items-center justify-center`}
                >
                  <MaterialCommunityIcons
                    name="image-edit-outline"
                    size={14}
                    color="#FFFFFF"
                  />
                </View>
              </View>
            ) : (
              <View style={tw`items-center justify-center`}>
                <Ionicons name="image-outline" size={22} color="#8E8B82" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {error ? (
        <Text style={tw`text-red-500 text-xs mt-1.5 ml-1`}>{error}</Text>
      ) : null}
    </View>
  );
};
