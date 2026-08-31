import NavHeading from "@/components/common/account/nav-heading";
import { Box } from "@/components/ui";
import tw from "@/components/ui/tailwind";
import FavIcon from "@/icon/favIcon";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: "1",
    question: "Question goes here",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Neque arcu velit fusce porttitor tellus consectetur justo pharetra a. Malesuada dignissim eu amet tristique faucibus pellentesque.",
  },
  {
    id: "2",
    question: "Question goes here",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Neque arcu velit fusce porttitor tellus consectetur justo pharetra a. Malesuada dignissim eu amet tristique faucibus pellentesque.",
  },
  {
    id: "3",
    question: "Question goes here",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Neque arcu velit fusce porttitor tellus consectetur justo pharetra a. Malesuada dignissim eu amet tristique faucibus pellentesque.",
  },
  {
    id: "4",
    question: "Question goes here",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Neque arcu velit fusce porttitor tellus consectetur justo pharetra a. Malesuada dignissim eu amet tristique faucibus pellentesque.",
  },
  {
    id: "5",
    question: "Question goes here",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Neque arcu velit fusce porttitor tellus consectetur justo pharetra a. Malesuada dignissim eu amet tristique faucibus pellentesque.",
  },
];

const FqaBox = () => {
  const [activeId, setActiveId] = useState<string | null>("1");

  const toggleAccordion = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <SafeAreaView style={[tw`flex-1 bg-[#FAF7F2]`]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />

      <NavHeading title="FAQ" />


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`px-5 pb-12`}
      >
        <Box
          style={tw`items-center size-22 mx-auto rounded-full justify-center bg-white my-6`}
        >
          <FavIcon width={44} height={44} name="fqa" />
        </Box>

        <View style={tw`gap-3`}>
          {faqData.map((item) => {
            const isOpen = activeId === item.id;
            return (
              <View key={item.id}>
                {/* Question Header Card */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => toggleAccordion(item.id)}
                  style={tw`bg-white rounded-2xl px-5 py-4 flex-row items-center justify-between`}
                >
                  <Text
                    style={tw`text-[#1F2937] text-[15px] font-bold flex-1 pr-3`}
                  >
                    {item.question}
                  </Text>
                  {isOpen ? (
                    <Feather name="minus" size={18} color="#1F2937" />
                  ) : (
                    <Feather name="plus" size={18} color="#1F2937" />
                  )}
                </TouchableOpacity>
                {isOpen && (
                  <View style={tw`bg-white rounded-2xl p-5 mt-2`}>
                    <Text
                      style={tw`text-gray-500 text-[13px] leading-5`}
                    >
                      {item.answer}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FqaBox;
