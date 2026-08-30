import { popularRecipes } from "@/components/data";
import { RecipeCard } from "@/components/reuseable/recipe-card";
import BackBtn from "@/components/ui/back-btn";
import tw from "@/components/ui/tailwind";
import { Insets } from "@/utils";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    StatusBar,
    Text,
    View
} from "react-native";

export default function AllRecipes() {
    const [favorites, setFavorites] = useState<Record<string, boolean>>({
        "2": true,
    });

    const toggleFavorite = (id: string) => {
        setFavorites((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };



    return (
        <View style={[tw`flex-1 bg-[#FAF7F2]`, { paddingTop: Insets.useTop(0, 0) }]}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
            <View style={tw`flex-row items-center justify-between px-5 pt-2 pb-4`}>
                <BackBtn />

                <Text style={tw`text-[#1F2937] text-xl font-bold tracking-tight text-center`}>
                    Popular recipes
                </Text>

                <View style={tw`w-10`} />
            </View>
            <FlatList
                data={popularRecipes}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <Link
                        href={{
                            pathname: "/(common)/details" as any,
                            params: { id: item.id },
                        }}
                        asChild
                    >
                        <RecipeCard
                            item={item}
                            isFavorite={!!favorites[item.id]}
                            onToggleFavorite={toggleFavorite}
                        />
                    </Link>
                )}
                columnWrapperStyle={tw`justify-between`}
                contentContainerStyle={tw`px-5 pt-2 pb-10`}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
