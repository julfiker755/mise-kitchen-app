import { defaultRecipeDetails, popularRecipes, Recipe } from "@/components/data";
import { Button, Heading } from "@/components/ui";
import tw from "@/components/ui/tailwind";
import useConfirmation from "@/hooks/use-confirmation";
import FavIcon from "@/icon/favIcon";
import { Insets, window } from "@/utils";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import CalculationHeading from "./calculation-heading";
import StatsGrid from "./stats-grid";

const SCREEN_WIDTH = window.width;




const ingredientsData = [
    '2 packs fresh or dried ramen noodles.',
    '8 to 10 medium shrimp, peeled and deveined.',
    '2 large eggs',
    '1 cup snow peas or sugar snap peas',
    '2 tablespoons chopped chives or green onions',
    '1 teaspoon black sesame seeds',
];



export default function RecipeDetailsScreen({ type }: {
    type?: "creator" | "user"
}) {
    const router = useRouter();
    const { confirm } = useConfirmation();
    const { id } = useLocalSearchParams<{ id?: string }>();
    const recipe: Recipe = useMemo(() => {
        const found = popularRecipes.find((r) => r.id === id);
        if (!found) {
            return {
                id: "1",
                title: "Shrimp Ramen Bowl",
                image:
                    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop",
                ...defaultRecipeDetails,
            };
        }

        return {
            ...defaultRecipeDetails,
            ...found,
            images: found.images || [found.image],
            author: found.author || defaultRecipeDetails.author,
            ingredients: found.ingredients || defaultRecipeDetails.ingredients,
            instructions: found.instructions || defaultRecipeDetails.instructions,
        };
    }, [id]);

    const [isFavorite, setIsFavorite] = useState(recipe.isFavorite ?? false);
    const [showInstructions, setShowInstructions] = useState(true);

    const handleDeleteRecipe = async () => {
        const isConfirmed = await confirm({
            title: "Delete recipe ?",
            description:
                "After deleting this recipe will no longer available in this application.",
        });

        if (isConfirmed) {
            console.log("Hi")
        }
    };

    const toggleFavorite = () => {
        setIsFavorite((prev) => !prev);
    };




    return (
        <View style={tw`flex-1`}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={tw`pb-32`}
            >
                <View style={tw`relative w-full h-[350px] bg-gray-200 overflow-hidden`}>

                    <Image
                        source={{ uri: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop" }}
                        style={{ width: SCREEN_WIDTH, height: 350 }}
                        resizeMode="cover"
                    />
                    <View
                        style={[
                            tw`absolute top-0 left-0 right-0 z-20 flex-row justify-between items-center px-5`,
                            { paddingTop: Insets.useTop(44, 8) },
                        ]}
                    >

                        <Button onPress={() => {
                            router.back()
                        }} size="icon" style={tw`bg-white`}>
                            <Feather name="arrow-left" size={22} color="#1F2937" />
                        </Button>



                        {type === "creator" ? (
                            <View style={tw`flex-row items-center gap-2.5`}>
                                <Button
                                    size="icon"
                                    style={tw`bg-white`}
                                    onPress={() => {
                                        router.push({
                                            pathname: "/creator/recipe-edit" as any,
                                            params: { id: recipe.id },
                                        });
                                    }}
                                >
                                    <FavIcon name="edit" />
                                </Button>
                                <Button
                                    size="icon"
                                    style={tw`bg-white`}
                                    onPress={handleDeleteRecipe}
                                >
                                    <FavIcon name="delete" />
                                </Button>
                            </View>
                        ) : (
                            <Button size="icon"
                                onPress={() => toggleFavorite()}
                                style={tw`bg-white`}
                            >
                                <Ionicons
                                    name={isFavorite ? "heart" : "heart-outline"}
                                    size={22}
                                    color={isFavorite ? "#EF4444" : "#1F2937"}
                                />
                            </Button>
                        )}

                    </View>
                </View>

                {type === "creator" && (
                    <CalculationHeading
                        containerStyle={tw`pt-4`}
                        data={[
                            { label: 'Total views', value: 100 },
                            { label: 'Total saved', value: 40 },
                            { label: 'Total list', value: 200 },
                        ]}
                    />
                )}
                <View style={tw`px-5 pt-5`}>
                    <View style={tw`self-start bg-[#EAE8DF] px-3.5 py-1.5 rounded-lg mb-3`}>
                        <Text style={tw`text-xs font-semibold text-[#57534E]`}>
                            {recipe.category || "Ramen"}
                        </Text>
                    </View>
                    <Text style={tw`text-2xl font-bold text-[#1F2937] leading-tight mb-2.5`}>
                        {recipe.title}
                    </Text>
                    <Text style={tw`text-[13.5px] leading-5 text-[#6B7280] font-normal mb-6`}>
                        {recipe.description}
                    </Text>

                    <StatsGrid
                        itemStyle={tw`py-3.5 px-3.5`}
                        valueStyle={tw`text-base`}
                        labelStyle={tw`text-xs`}

                        stats={[
                            { label: "Cooking time", value: "20 minutes", icon: <Feather name="clock" size={18} color="#5B7553" /> },
                            { label: "Servings", value: "3 persons", icon: <Feather name="users" size={18} color="#5B7553" /> },
                            { label: "Cuisines", value: "Japanies", icon: <MaterialCommunityIcons name="noodles" size={19} color="#5B7553" /> },
                            { label: "Rating", value: 4.5, icon: <Feather name="star" size={18} color="#F59E0B" /> },
                        ]}
                    />



                    <View style={tw`flex-row justify-between`}>
                        <View style={tw`${type === "creator" ? "w-[48%]" : "w-full"}`}>
                            <Link
                                href={{
                                    pathname: "/(common)/review-list" as any,
                                    params: { id: "45" },
                                }}
                                asChild
                            >
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={tw`w-full bg-white border border-[#EBE6DC] rounded-lg py-2 flex-row items-center justify-center gap-2`}
                                >
                                    <FavIcon name="review" />
                                    <Text style={tw`text-lg font-semibold text-[#374151]`}>
                                        Reviews
                                    </Text>
                                </TouchableOpacity>
                            </Link>
                        </View>

                        {type === "creator" && (
                            <View style={tw`w-[48%]`}>
                                <Link
                                    href={{
                                        pathname: "/creator/analysis" as any,
                                        params: { id: recipe.id },
                                    }}
                                    asChild
                                >
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={tw`w-full bg-white border border-[#EBE6DC] rounded-lg py-2 flex-row items-center justify-center gap-2`}
                                    >
                                        <FavIcon name="analysis" />
                                        <Text style={tw`text-lg font-semibold text-[#374151]`}>
                                            Analytics
                                        </Text>
                                    </TouchableOpacity>
                                </Link>
                            </View>
                        )}
                    </View>


                    <View style={tw`my-6`}>
                        <Text style={tw`text-sm font-semibold text-[#6B7280] mb-2.5`}>
                            Recipe by
                        </Text>
                        <View style={tw`flex-row items-center justify-between`}>
                            <View style={tw`flex-row items-center`}>
                                <Image
                                    source={{ uri: recipe.author?.avatar }}
                                    style={tw`w-11 h-11 rounded-full mr-3 bg-gray-200 border border-[#E5E0D8]`}
                                    resizeMode="cover"
                                />
                                <View>
                                    <Text style={tw`text-[15px] font-bold text-[#1F2937]`}>
                                        {recipe.author?.name || "Tom Holand"}
                                    </Text>
                                    <Text style={tw`text-xs text-[#9CA3AF] font-medium mt-0.5`}>
                                        {recipe.author?.role || "Cook"}
                                    </Text>
                                </View>
                            </View>


                            <Link
                                href={{
                                    pathname: "/(common)/creator-profile",
                                    params: { id: "45" }
                                }}
                                asChild>
                                <Button variant="secondary" style={tw`text-lg`}>
                                    <Text style={tw`text-xs font-semibold text-[#4B5563]`}>
                                        See all recipes
                                    </Text>


                                </Button>
                            </Link>
                        </View>
                    </View>

                    <View style={tw`mb-6`}>
                        <Heading variant="h3" style={tw`mb-3`}> Ingredients</Heading>

                        {ingredientsData.map((ingredient, index) => (
                            <View key={index} style={tw`flex-row items-center mb-3`}>
                                <Text style={tw`text-base text-[#374151]`}>{index + 1}.{" "}</Text>
                                <Text style={tw`text-base text-[#374151]`}>{ingredient}</Text>
                            </View>
                        ))}
                    </View>
                    {showInstructions && (
                        <View style={tw`bg-white rounded-2xl p-4.5 mb-4 border border-[#E8E4DB]`}>
                            <Heading variant="h3" style={tw`mb-3`}> Instructions</Heading>


                            <View style={tw`gap-3`}>
                                {recipe.instructions?.map((instruction, index) => (
                                    <View key={`instruction-${index}`} style={tw`flex-row items-start`}>
                                        <Text style={tw`text-sm font-semibold text-[#1F2937] w-5 mt-0.5`}>
                                            {index + 1}.
                                        </Text>
                                        <Text style={tw`flex-1 text-sm text-[#4B5563] leading-5 font-normal`}>
                                            {instruction}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {type === "user" && (
                        <Button variant="secondary" style={tw`text-lg h-11 border-none shadow-none bg-white`} onPress={() => setShowInstructions((prev) => !prev)}>
                            <Text style={tw`text-sm mr-1 font-semibold text-[#4B5563]`}>
                                {showInstructions ? "Hide instructions" : "Show instructions"}
                            </Text>
                            <Feather
                                name={showInstructions ? "chevron-up" : "chevron-down"}
                                size={20}
                                color="#4B5563"
                            />
                        </Button>
                    )}

                </View>
            </ScrollView>

            <Button style={[
                tw`absolute bottom-0 left-0 right-0 bg-[#FAF7F2]/95 px-5 pt-3 border-t border-[#EBE6DC]`,
                { paddingBottom: Insets.useBottom(16, 8) },
            ]}>

            </Button>
            <View
                style={[
                    tw`absolute bottom-0 left-0 right-0 bg-[#FAF7F2]/95 px-5 pt-3 border-t border-[#EBE6DC]`,
                    { paddingBottom: Insets.useBottom(16, 8) },
                ]}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={tw`bg-primary w-full py-4 rounded-full items-center justify-center shadow-md`}
                >
                    <Text style={tw`text-white font-bold text-base tracking-wide`}>
                        Let&apos;s cook
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
