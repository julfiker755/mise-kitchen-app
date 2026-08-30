import { Recipe } from "@/components/data";
import tw from "@/components/ui/tailwind";
import { Ionicons } from "@expo/vector-icons";
import React, { forwardRef } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export interface RecipeCardProps {
  item: Recipe;
  isFavorite?: boolean;
  onPress?: (e?: any) => void;
  onToggleFavorite?: (id: string) => void;
  favoriteIcon?: boolean
}

export const RecipeCard = forwardRef<View, RecipeCardProps>(
  ({ item, isFavorite = false, onPress, onToggleFavorite, favoriteIcon = true }, ref) => {
    return (
      <TouchableOpacity
        ref={ref as any}
        activeOpacity={0.85}
        onPress={onPress}
        style={tw`w-[48%] mb-5`}
      >
        {/* Image Container */}
        <View
          style={[
            tw`w-full h-44 rounded-2xl overflow-hidden relative items-center justify-center p-2.5 bg-[#D9D9D9]`]}
        >
          {item.isSpicy && (
            <View style={tw`absolute top-3 left-3 z-10`}>
              <Text style={tw`text-base`}>🔥</Text>
            </View>
          )}

          {favoriteIcon && <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onToggleFavorite?.(item.id)}
            style={tw`absolute top-3 right-3 z-10 p-1`}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={25}
              color={isFavorite ? "#EF4444" : "#374151"}
            />
          </TouchableOpacity>}

          <Image
            source={{ uri: item.image }}
            style={tw`w-full h-full rounded-2xl`}
            resizeMode="cover"
          />
        </View>
        <Text
          numberOfLines={2}
          style={tw`text-center font-bold text-[15px] text-[#1F2937] mt-2.5 leading-snug px-1`}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  }
);
