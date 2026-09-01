import tw from "@/components/ui/tailwind";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface RecipeSelectTriggerProps {
  label?: string;
  value?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  onPress: () => void;
  error?: string;
  containerStyle?: any;
}

export const RecipeSelectTrigger: React.FC<RecipeSelectTriggerProps> = ({
  label,
  value,
  placeholder = "Select an option",
  icon,
  onPress,
  error,
  containerStyle,
}) => {
  const hasValue = Boolean(value && value.trim().length > 0);

  return (
    <View style={[tw`w-full mb-3.5`, containerStyle]}>
      {label ? (
        <Text style={tw`text-[14px] font-semibold text-[#1E2022] mb-1.5`}>
          {label}
        </Text>
      ) : null}

      <TouchableOpacity
        activeOpacity={0.75}
        onPress={onPress}
        style={[
          tw`bg-white rounded-2xl h-[52px] px-4 flex-row items-center justify-between border ${
            error ? "border-red-400" : "border-transparent"
          }`,
        ]}
      >
        <View style={tw`flex-row items-center flex-1 mr-2`}>
          {icon ? <View style={tw`mr-2.5`}>{icon}</View> : null}
          <Text
            style={[
              tw`text-[15px]`,
              hasValue ? tw`text-[#1E2022] font-medium` : tw`text-[#A0A0A0]`,
            ]}
            numberOfLines={1}
          >
            {hasValue ? value : placeholder}
          </Text>
        </View>

        <Feather name="chevron-down" size={19} color="#71717A" />
      </TouchableOpacity>

      {error ? (
        <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>{error}</Text>
      ) : null}
    </View>
  );
};
