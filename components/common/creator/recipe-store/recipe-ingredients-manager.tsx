import tw from "@/components/ui/tailwind";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface RecipeIngredientsManagerProps {
  ingredients: string[];
  onChange: (items: string[]) => void;
  error?: string;
}

export const RecipeIngredientsManager: React.FC<RecipeIngredientsManagerProps> = ({
  ingredients = [],
  onChange,
  error,
}) => {
  const [currentText, setCurrentText] = useState("");

  const handleAdd = () => {
    const trimmed = currentText.trim();
    if (!trimmed) return;
    onChange([...ingredients, trimmed]);
    setCurrentText("");
  };

  const handleRemove = (index: number) => {
    const updated = ingredients.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <View style={tw`w-full mb-5`}>
      <Text style={tw`text-[14px] font-semibold text-[#1E2022] mb-2`}>
        Ingredients
      </Text>

      <View
        style={tw`bg-white rounded-2xl h-[52px] px-3.5 flex-row items-center justify-between border border-transparent mb-3`}
      >
        <TextInput
          value={currentText}
          onChangeText={setCurrentText}
          placeholder="Type your ingredients"
          placeholderTextColor="#A0A0A0"
          onSubmitEditing={handleAdd}
          returnKeyType="done"
          style={tw`flex-1 text-[#1E2022] text-[15px] h-full pr-2`}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleAdd}
          style={tw`w-9 h-9 rounded-xl bg-primary items-center justify-center`}
        >
          <Ionicons name="add" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Added Ingredients List */}
      {ingredients.length > 0 ? (
        <View style={tw`gap-2.5 mt-1 px-1`}>
          {ingredients.map((item, index) => (
            <View
              key={`ing-${index}`}
              style={tw`flex-row items-center justify-between py-1`}
            >
              <View style={tw`flex-row items-start flex-1 mr-3`}>
                <Text style={tw`text-[14.5px] font-medium text-[#4B5563] mr-1.5`}>
                  {index + 1}.
                </Text>
                <Text style={tw`text-[14.5px] text-[#4B5563] leading-5 flex-1`}>
                  {item}
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleRemove(index)}
                style={tw`p-1.5`}
              >
                <Ionicons name="trash-outline" size={19} color="#FF4040" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : null}

      {error ? (
        <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{error}</Text>
      ) : null}
    </View>
  );
};
