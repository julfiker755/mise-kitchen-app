import NavHeading from "@/components/common/account/nav-heading";
import CalculationHeading from "@/components/common/basic/calculation-heading";
import ViewsPreferencesChart from "@/components/common/creator/chart";
import { popularRecipes } from "@/components/data";
import tw from "@/components/ui/tailwind";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Analysis = () => {
    const { id } = useLocalSearchParams<{ id?: string }>();

    const details = popularRecipes?.[0]

    return (
        <SafeAreaView style={tw`flex-1 bg-[#FAF7F2]`}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
            <NavHeading title="Recipe analytics" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={tw`px-5 pt-3 pb-8`}
            >
                <View
                    style={tw`bg-white rounded-3xl p-3.5 flex-row items-center border border-[#F0ECE1] shadow-xs mb-6`}
                >
                    <Image
                        source={{ uri: details.image }}
                        style={tw`w-18 h-18 rounded-2xl bg-gray-100`}
                        resizeMode="cover"
                    />

                    <View style={tw`ml-3.5 flex-1`}>
                        <Text
                            style={tw`text-[#1E293B] text-[16px] font-bold mb-2`}
                            numberOfLines={1}
                        >
                            {details.title}
                        </Text>

                        <View style={tw`flex-row items-center gap-2`}>
                            <View
                                style={tw`flex-row items-center bg-[#F4F1EA] px-2.5 py-1 rounded-full`}
                            >
                                <Feather name="clock" size={13} color="#7E847B" />
                                <Text
                                    style={tw`text-[#555C54] text-[12px] font-medium ml-1.5`}
                                >
                                    {details?.cookingTime}
                                </Text>
                            </View>
                            <View
                                style={tw`flex-row items-center bg-[#F4F1EA] px-2.5 py-1 rounded-full`}
                            >
                                <Ionicons
                                    name="people-outline"
                                    size={14}
                                    color="#7E847B"
                                />
                                <Text
                                    style={tw`text-[#555C54] text-[12px] font-medium ml-1`}
                                >
                                    {details.servings}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <CalculationHeading
                    data={[
                        { label: 'Total views', value: 100 },
                        { label: 'Total saved', value: 40 },
                        { label: 'Total list', value: 200 },
                    ]}
                />
                <ViewsPreferencesChart />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Analysis;

