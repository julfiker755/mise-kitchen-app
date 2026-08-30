import { Category, categories as defaultCategories } from "@/components/data";
import tw from "@/components/ui/tailwind";
import { useFormFields } from "@/hooks/useFromFields";
import { Insets } from "@/utils";
import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export interface FilterState {
  category: string;
  cuisines: string;
  prepareTime: string;
  serving: string;
}

export interface HomeFilterModalProps {
  visible: boolean;
  onClose: () => void;
  categories?: Category[];
  handleSubmit?: (filters: FilterState) => void;
}

const FILTER_DATA = {
  cuisines: ["Asian", "Italian", "Mexican"],
  prepareTimes: ["20 min", "30 min", "40 min", "50 min"],
  servings: ["2 persons", "3 persons", "4 persons", "8 persons"],
};


export function HomeFilterModal({
  visible,
  onClose,
  categories = defaultCategories,
  handleSubmit,
}: HomeFilterModalProps) {
  const paddingBottom = Insets.useBottom(24, 16);

  const { formData, change, reset } = useFormFields<FilterState>({
    category: "Biriyani",
    cuisines: "Asian",
    prepareTime: "20 min",
    serving: "4 persons",
  });

  const toggle = (key: keyof FilterState, value: string) => {
    change(key, formData[key] === value ? "" : value);
  };

  const onSubmit = () => {
    handleSubmit?.(formData);
    onClose();
  };

  const Section = ({
    title,
    children,
    className = "mb-5",
  }: {
    title: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <View style={tw`${className}`}>
      <Text style={tw`text-base font-bold text-[#1F2937] mb-3`}>
        {title}
      </Text>
      <View style={tw`flex-row flex-wrap gap-2.5`}>{children}</View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={tw`flex-1 bg-black/40 justify-end`}>
          <TouchableWithoutFeedback>
            <View
              style={[
                tw`bg-[#FAF7F2] rounded-t-[32px] px-5 pt-3 max-h-[85%]`,
                { paddingBottom },
              ]}
            >
              {/* Handle */}
              <View
                style={tw`w-12 h-1 bg-[#333333] rounded-full self-center mb-3 opacity-60`}
              />

              {/* Header */}
              <View style={tw`flex-row items-center justify-between mb-4`}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={reset}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={tw`text-xs opacity-0 text-gray-500 font-medium`}>
                    Reset
                  </Text>
                </TouchableOpacity>

                <Text style={tw`text-xl font-bold text-[#1F2937]`}>
                  Filter
                </Text>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={onClose}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  style={tw`p-1`}
                >
                  <Feather name="x" size={22} color="#1F2937" />
                </TouchableOpacity>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={tw`pb-4`}
              >
                {/* Category */}
                <Section title="Category">
                  {categories.slice(0, 4).map((cat) => (
                    <FilterOption
                      key={cat.id || cat.title}
                      label={cat.title}
                      image={cat.image}
                      selected={formData.category === cat.title}
                      onPress={() => toggle("category", cat.title)}
                    />
                  ))}
                </Section>

                {/* Cuisine */}
                <Section title="Cuisine">
                  {FILTER_DATA.cuisines.map((item) => (
                    <FilterOption
                      key={item}
                      label={item}
                      selected={formData.cuisines === item}
                      onPress={() => toggle("cuisines", item)}
                    />
                  ))}
                </Section>

                {/* Prepare Time */}
                <Section title="Prepare time">
                  {FILTER_DATA.prepareTimes.map((item) => (
                    <FilterOption
                      key={item}
                      label={item}
                      icon="clock"
                      selected={formData.prepareTime === item}
                      onPress={() => toggle("prepareTime", item)}
                    />
                  ))}
                </Section>

                {/* Servings */}
                <Section title="Servings" className="mb-4">
                  {FILTER_DATA.servings.map((item) => (
                    <FilterOption
                      key={item}
                      label={item}
                      icon="users"
                      selected={formData.serving === item}
                      onPress={() => toggle("serving", item)}
                    />
                  ))}
                </Section>

                {/* Apply */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={onSubmit}
                  style={tw`w-full bg-primary rounded-full py-3.5 items-center justify-center mt-2 shadow-sm`}
                >
                  <Text style={tw`text-white text-base font-semibold`}>
                    Apply Filter
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}



type FilterOptionProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: "clock" | "users";
  image?: string;
};



const FilterOption = ({
  label,
  selected,
  onPress,
  icon,
  image,
}: FilterOptionProps) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={[
      tw`rounded-full flex-row items-center`,
      image ? tw`pl-1.5 pr-3 py-1.5` : tw`px-3.5 py-2`,
      selected
        ? tw`bg-primary`
        : tw`bg-white border border-[#F0EBE1]`,
    ]}
  >
    {image && (
      <Image
        source={{ uri: image }}
        style={tw`w-7 h-7 rounded-full mr-2`}
        resizeMode="cover"
      />
    )}

    {icon && (
      <Feather
        name={icon}
        size={15}
        color={selected ? "#FFFFFF" : "#6B7280"}
        style={tw`mr-1.5`}
      />
    )}

    <Text
      style={[
        tw`text-sm font-medium`,
        selected ? tw`text-white mr-1.5` : tw`text-[#374151]`,
      ]}
    >
      {label}
    </Text>

    {selected && (
      <Ionicons name="checkmark-circle" size={17} color="#FFFFFF" />
    )}
  </TouchableOpacity>
);
