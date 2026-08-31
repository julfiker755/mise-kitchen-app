import { Recipe } from "@/components/data";
import tw from "@/components/ui/tailwind";
import { Ionicons } from "@expo/vector-icons";
import React, { forwardRef } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export interface TopHitCardProps {
  item: Recipe;
  onPress?: () => void;
}

export const TopHitCard = forwardRef<View, TopHitCardProps>(
  ({ item, onPress }, ref) => {
    return (
      <TouchableOpacity
        ref={ref as any}
        activeOpacity={0.9}
        onPress={onPress}
        style={tw`bg-white rounded-3xl p-3.5 border border-gray-200 mb-4`}
      >
        <Image
          source={{ uri: item.image }}
          style={tw`w-full h-46 rounded-2xl`}
          resizeMode="cover"
        />
        <View style={tw`mt-3`}>
          <Text style={tw`text-[#1E293B] text-[16px] font-bold`}>
            {item.title}
          </Text>
          <View style={tw`flex-row items-center justify-between mt-2.5`}>
            <View style={tw`flex-row items-center`}>
              <View
                style={tw`flex-row items-center bg-[#F4F1EA] px-2.5 py-1.5 rounded-full mr-2`}
              >
                <Ionicons name="time-outline" size={13} color="#6F7470" />
                <Text style={tw`text-[#555C54] text-[11.5px] font-medium ml-1`}>
                  {item.cookingTime || "20 min"}
                </Text>
              </View>
              <View
                style={tw`flex-row items-center bg-[#F4F1EA] px-2.5 py-1.5 rounded-full`}
              >
                <Ionicons name="people-outline" size={13} color="#6F7470" />
                <Text style={tw`text-[#555C54] text-[11.5px] font-medium ml-1`}>
                  {item.servings || "4"}
                </Text>
              </View>
            </View>

            <View style={tw`flex-row items-center`}>
              <Ionicons name="eye-outline" size={16} color="#6F7470" />
              <Text style={tw`text-[#555C54] text-[13px] font-medium ml-1.5`}>
                {item.views || "12.5k"}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

TopHitCard.displayName = "TopHitCard";

export default TopHitCard;
