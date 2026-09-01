import tw from "@/components/ui/tailwind";
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface SelectOption {
  label: string;
  value: string;
}

interface RecipeSelectModalProps {
  visible: boolean;
  title?: string;
  options: (string | SelectOption)[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

export const RecipeSelectModal: React.FC<RecipeSelectModalProps> = ({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
}) => {
  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        style={tw`flex-1 bg-black/50 justify-center items-center px-6`}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={tw`w-full max-w-[360px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#EBE6DC]`}
        >
          {title ? (
            <View style={tw`px-6 py-4 border-b border-[#F0ECE1] flex-row justify-between items-center bg-[#FAF7F2]`}>
              <Text style={tw`text-base font-bold text-[#1E2022]`}>{title}</Text>
              <TouchableOpacity
                onPress={onClose}
                activeOpacity={0.7}
                style={tw`p-1`}
              >
                <Feather name="x" size={20} color="#71717A" />
              </TouchableOpacity>
            </View>
          ) : null}

          <ScrollView style={tw`max-h-[320px]`} showsVerticalScrollIndicator={false}>
            {normalizedOptions.map((item, index) => {
              const isSelected = selectedValue === item.value;
              const isLast = index === normalizedOptions.length - 1;

              return (
                <TouchableOpacity
                  key={`opt-${index}-${item.value}`}
                  activeOpacity={0.7}
                  onPress={() => {
                    onSelect(item.value);
                    onClose();
                  }}
                  style={[
                    tw`px-6 py-4 flex-row items-center justify-between`,
                    !isLast && tw`border-b border-[#F0ECE1]`,
                    isSelected && tw`bg-[#F4F1EA]`,
                  ]}
                >
                  <Text
                    style={[
                      tw`text-[15px]`,
                      isSelected
                        ? tw`font-semibold text-[#1E2022]`
                        : tw`font-normal text-[#4B5563]`,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {isSelected ? (
                    <Feather name="check" size={18} color="#5B7553" />
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
