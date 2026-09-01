import StatsGrid from "@/components/common/basic/stats-grid";
import ViewsPreferencesChart from "@/components/common/creator/chart";
import { topHitRecipes } from "@/components/data";
import { TopHitCard } from "@/components/reuseable/top-hit-card";
import { Button } from "@/components/ui";
import tw from "@/components/ui/tailwind";
import { Insets } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    View
} from "react-native";

/* ============================================================
   Main Creator Screen
============================================================ */
export default function CreatorScreen() {
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

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 24,
                }}
            >
                {/* Header */}
                <View style={tw`flex-row items-center justify-between mt-2 mb-6`}>
                    <View style={tw`flex-row items-center`}>
                        {/* Creator Avatar */}
                        <Image
                            source={{
                                uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
                            }}
                            style={tw`w-13 h-13 rounded-full border border-pink-200`}
                            resizeMode="cover"
                        />
                        <View style={tw`ml-3`}>
                            <Text style={tw`text-[#1E293B] text-[19px] font-bold tracking-tight`}>
                                Hello, Abid
                            </Text>
                            <Text style={tw`text-[#8E938B] text-[14px] font-medium mt-0.5`}>
                                Creator
                            </Text>
                        </View>
                    </View>

                    <Button size="icon" style={tw`size-11`} onPress={() => router.push("/creator/recipe-store")}>
                        <Ionicons name="add" size={24} color="#FFFFFF" />
                    </Button>
                </View>

                <StatsGrid
                    stats={[
                        { label: "Total recipe", value: 12 },
                        { label: "Total views", value: "12.5k" },
                        { label: "Total saved", value: 366 },
                        { label: "Total list generated", value: 89 },
                    ]}
                />
                <ViewsPreferencesChart />

                <View style={tw`mb-4`}>
                    <Text style={tw`text-[#1E293B] text-[18px] font-bold mb-3`}>
                        Top hit recipe
                    </Text>

                    {topHitRecipes.map((recipe) => (
                        <TopHitCard
                            key={recipe.id}
                            item={recipe}
                            onPress={() => {
                                router.push({
                                    pathname: "/creator/details",
                                    params: { id: recipe.id },
                                });
                            }}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

