import { popularRecipes, Recipe } from "@/components/data";
import { TopHitCard } from "@/components/reuseable/top-hit-card";
import { Box } from "@/components/ui";
import tw from "@/components/ui/tailwind";
import { Insets } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    FlatList,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function CreatorRecipesScreen() {
    const creatorRecipes: Recipe[] = popularRecipes.map((item) => ({
        ...item,
        cookingTime: item.cookingTime || "20 min",
        servings: item.servings || "4",
        views: item.views || "12.5k",
    }));

    return (
        <View
            style={[
                tw`flex-1 bg-[#FAF7F2]`,
                { paddingTop: Insets.useTop(16) },
            ]}
        >
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FAF7F2"
                translucent={true}
            />

            {/* Header */}
            <View style={tw`flex-row items-center justify-between px-5 pt-2 pb-4`}>
                <View style={tw`w-11`} />

                <Text style={tw`text-[#1E293B] text-[18px] font-bold text-center`}>
                    Manage recipes
                </Text>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        // Add recipe action
                    }}
                >
                    <Box style={tw`size-11 rounded-full bg-[#5B7553] items-center justify-center`}>
                        <Ionicons name="add" size={24} color="#FFFFFF" />
                    </Box>
                </TouchableOpacity>
            </View>

            <FlatList
                data={creatorRecipes}
                keyExtractor={(item: Recipe) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 24,
                }}
                renderItem={({ item }: { item: Recipe }) => (
                    <TopHitCard
                        item={item}
                        onPress={() => {
                            router.push({
                                pathname: "/creator/details",
                                params: { id: item.id },
                            });
                        }}
                    />
                )}
            />
        </View>
    );
}
