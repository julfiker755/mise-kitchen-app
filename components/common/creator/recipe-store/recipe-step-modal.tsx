import tw from "@/components/ui/tailwind";
import { Insets } from "@/utils";
import {
  Feather,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { InstructionStep } from "./recipe-instruction-card";

interface RecipeStepModalProps {
  visible: boolean;
  initialData?: InstructionStep | null;
  onSave: (step: InstructionStep) => void;
  onClose: () => void;
}

export const RecipeStepModal: React.FC<RecipeStepModalProps> = ({
  visible,
  initialData,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | undefined>(undefined);
  const [activeFormat, setActiveFormat] = useState<string[]>([]);
  const [error, setError] = useState("");

  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setImage(initialData.image);
    } else {
      setTitle("");
      setDescription("");
      setImage(undefined);
    }
    setError("");
  }, [initialData, visible]);

  const pickStepImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Permission to access photo gallery is required."
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
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      console.error("Step image pick error:", err);
    }
  };

  const handleToggleFormat = (formatKey: string) => {
    setActiveFormat((prev) =>
      prev.includes(formatKey)
        ? prev.filter((f) => f !== formatKey)
        : [...prev, formatKey]
    );
  };

  const handleSave = () => {
    if (!title.trim()) {
      setError("Please enter a step title");
      return;
    }
    if (!description.trim()) {
      setError("Please write instruction details");
      return;
    }

    onSave({
      id: initialData?.id || Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      image,
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={tw`flex-1 bg-black/50 justify-end`}
      >
        <View
          style={[
            tw`w-full bg-[#FAF7F2] rounded-t-[32px] overflow-hidden max-h-[90%]`,
            { paddingBottom: Insets.useBottom(20, 8) },
          ]}
        >
          {/* Drag Pill Handle */}
          <View style={tw`items-center pt-3 pb-2`}>
            <View style={tw`w-12 h-1.5 rounded-full bg-[#D6D2C4]`} />
          </View>

          {/* Header Title */}
          <View style={tw`px-6 py-2 border-b border-[#EDE9DF]`}>
            <Text style={tw`text-[18px] font-bold text-[#1E2022] text-center`}>
              {isEditMode ? "Edit instruction step" : "Add instruction step"}
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`px-6 pt-4 pb-6`}
          >
            {/* Upload Image (Optional) */}
            <Text style={tw`text-[14px] font-semibold text-[#1E2022] mb-1.5`}>
              Upload image <Text style={tw`text-[#8E8B82] font-normal`}>(Optional)</Text>
            </Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={pickStepImage}
              style={[
                tw`w-full h-[120px] rounded-2xl overflow-hidden items-center justify-center border mb-4`,
                image
                  ? tw`border-[#E5E0D8] bg-gray-100`
                  : tw`border-dashed border-[#D1CCC0] bg-[#F2EFE9]`,
              ]}
            >
              {image ? (
                <View style={tw`relative w-full h-full`}>
                  <Image
                    source={{ uri: image }}
                    style={tw`w-full h-full`}
                    resizeMode="cover"
                  />
                  <View
                    style={tw`absolute top-2.5 right-2.5 bg-black/40 p-1.5 rounded-lg items-center justify-center`}
                  >
                    <MaterialCommunityIcons
                      name="image-edit-outline"
                      size={18}
                      color="#FFFFFF"
                    />
                  </View>
                </View>
              ) : (
                <View style={tw`items-center justify-center`}>
                  <Ionicons name="image-outline" size={26} color="#5B7553" />
                </View>
              )}
            </TouchableOpacity>

            {/* Title Field */}
            <Text style={tw`text-[14px] font-semibold text-[#1E2022] mb-1.5`}>
              Title
            </Text>
            <View
              style={tw`bg-white rounded-2xl h-[52px] px-4 justify-center border border-transparent mb-4`}
            >
              <TextInput
                value={title}
                onChangeText={(text) => {
                  setTitle(text);
                  if (error) setError("");
                }}
                placeholder="Enter instruction title here"
                placeholderTextColor="#A0A0A0"
                style={tw`text-[#1E2022] text-[15px]`}
              />
            </View>

            {/* Rich Formatting Toolbar */}
            <View
              style={tw`bg-white rounded-xl py-2 px-2.5 flex-row items-center justify-between border border-[#EBE6DC] mb-3`}
            >
              <TouchableOpacity
                onPress={() => handleToggleFormat("undo")}
                style={tw`p-1.5`}
              >
                <Octicons name="reply" size={15} color="#5B7553" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleToggleFormat("redo")}
                style={tw`p-1.5`}
              >
                <Octicons
                  name="reply"
                  size={15}
                  color="#71717A"
                  style={{ transform: [{ scaleX: -1 }] }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleToggleFormat("format")}
                style={tw`p-1.5`}
              >
                <MaterialCommunityIcons
                  name="format-text"
                  size={16}
                  color="#71717A"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleToggleFormat("bold")}
                style={[
                  tw`p-1.5 rounded`,
                  activeFormat.includes("bold") && tw`bg-[#EAE6DD]`,
                ]}
              >
                <Feather name="bold" size={15} color="#1E2022" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleToggleFormat("italic")}
                style={[
                  tw`p-1.5 rounded`,
                  activeFormat.includes("italic") && tw`bg-[#EAE6DD]`,
                ]}
              >
                <Feather name="italic" size={15} color="#1E2022" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleToggleFormat("underline")}
                style={[
                  tw`p-1.5 rounded`,
                  activeFormat.includes("underline") && tw`bg-[#EAE6DD]`,
                ]}
              >
                <Feather name="underline" size={15} color="#1E2022" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleToggleFormat("strike")}
                style={[
                  tw`p-1.5 rounded`,
                  activeFormat.includes("strike") && tw`bg-[#EAE6DD]`,
                ]}
              >
                <FontAwesome6 name="strikethrough" size={13} color="#1E2022" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleToggleFormat("link")}
                style={tw`p-1.5`}
              >
                <Feather name="link" size={15} color="#71717A" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleToggleFormat("image")}
                style={tw`p-1.5`}
              >
                <Feather name="image" size={15} color="#71717A" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleToggleFormat("expand")}
                style={tw`p-1.5`}
              >
                <Feather name="maximize-2" size={15} color="#71717A" />
              </TouchableOpacity>
            </View>

            {/* Instruction Textarea Field */}
            <Text style={tw`text-[14px] font-semibold text-[#1E2022] mb-1.5`}>
              Instruction
            </Text>
            <View
              style={tw`bg-white rounded-2xl min-h-[110px] p-4 border border-transparent mb-2`}
            >
              <TextInput
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                  if (error) setError("");
                }}
                placeholder="Write your instruction here..."
                placeholderTextColor="#A0A0A0"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                style={tw`text-[#1E2022] text-[15px] min-h-[90px] leading-5`}
              />
            </View>

            {error ? (
              <Text style={tw`text-red-500 text-xs mb-3 ml-1`}>{error}</Text>
            ) : null}

            {/* Action Buttons */}
            <View style={tw`flex-row items-center justify-between gap-3 mt-4`}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onClose}
                style={tw`flex-1 h-[50px] rounded-full bg-[#EAE6DD] items-center justify-center`}
              >
                <Text style={tw`text-[#4B5563] font-semibold text-[15px]`}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleSave}
                style={tw`flex-1 h-[50px] rounded-full bg-primary items-center justify-center shadow-sm`}
              >
                <Text style={tw`text-white font-semibold text-[15px]`}>
                  {isEditMode ? "Save changes" : "Add"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
