import tw from "@/components/ui/tailwind";
import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export interface InstructionStep {
  id?: string;
  title: string;
  description: string;
  image?: string;
}

interface RecipeInstructionCardProps {
  step: InstructionStep;
  stepNumber: number;
  onEdit: () => void;
  onDelete: () => void;
}

export const RecipeInstructionCard: React.FC<RecipeInstructionCardProps> = ({
  step,
  stepNumber,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={tw`bg-white rounded-2xl p-4 mb-4 border border-[#E8E4DB] shadow-sm`}>
      {/* Header with Step label and Action Icons */}
      <View style={tw`flex-row items-center justify-between mb-3`}>
        <Text style={tw`text-[15px] font-bold text-[#1F2937]`}>
          Step {stepNumber}
        </Text>

        <View style={tw`flex-row items-center gap-3`}>
          <TouchableOpacity activeOpacity={0.7} onPress={onEdit} style={tw`p-1`}>
            <Feather name="edit-2" size={17} color="#71717A" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={onDelete} style={tw`p-1`}>
            <Ionicons name="trash-outline" size={19} color="#FF4040" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Step Image Banner (if present) */}
      {step.image ? (
        <View style={tw`w-full h-[140px] rounded-xl overflow-hidden mb-3.5 bg-gray-100`}>
          <Image
            source={{ uri: step.image }}
            style={tw`w-full h-full`}
            resizeMode="cover"
          />
        </View>
      ) : null}

      {/* Step Title */}
      {step.title ? (
        <Text style={tw`text-[15px] font-bold text-[#1F2937] leading-snug mb-1.5`}>
          {step.title}
        </Text>
      ) : null}

      {/* Step Description */}
      {step.description ? (
        <Text style={tw`text-[13.5px] text-[#6B7280] leading-5`}>
          {step.description}
        </Text>
      ) : null}
    </View>
  );
};
