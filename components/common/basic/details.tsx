import { defaultRecipeDetails, popularRecipes, Recipe } from "@/components/data";
import { Button } from "@/components/ui";
import tw from "@/components/ui/tailwind";
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

export default function RecipeDetailsScreen({ type }: {
    type?: "creator" | "user"
}) {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id?: string }>();

    // Find recipe or fallback to first popular recipe with default details
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

    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(recipe.isFavorite ?? false);
    const [showInstructions, setShowInstructions] = useState(true);
    const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

    const images = recipe.images && recipe.images.length > 0 ? recipe.images : [recipe.image];



    const toggleFavorite = () => {
        setIsFavorite((prev) => !prev);
    };

    const toggleIngredient = (index: number) => {
        setCheckedIngredients((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
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
                                <Button size="icon" style={tw`bg-white`}>
                                    <FavIcon name="edit" />
                                </Button>
                                <Button size="icon" style={tw`bg-white`}>
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

                        {type == "creator" && (
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


                    {/* Recipe By (Author) Section */}
                    <View style={tw`mb-6`}>
                        <Text style={tw`text-xs font-semibold text-[#6B7280] mb-2.5`}>
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
                                    pathname: "/(common)/creator-profile" as any,
                                    params: { id: "45" }
                                }}
                                asChild>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={tw`bg-white border border-[#E5E0D8] px-3.5 py-1.5 rounded-full shadow-sm`}
                                >
                                    <Text style={tw`text-xs font-semibold text-[#4B5563]`}>
                                        See all recipes
                                    </Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>

                    {/* Ingredients Section */}
                    <View style={tw`mb-6`}>
                        <Text style={tw`text-base font-bold text-[#1F2937] mb-3.5`}>
                            Ingredients
                        </Text>

                        <View style={tw`gap-3`}>
                            {recipe.ingredients?.map((ingredient, index) => {
                                const isChecked = !!checkedIngredients[index];
                                return (
                                    <TouchableOpacity
                                        key={`ingredient-${index}`}
                                        activeOpacity={0.7}
                                        onPress={() => toggleIngredient(index)}
                                        style={tw`flex-row items-center`}
                                    >
                                        {/* Checkbox Box */}
                                        <View
                                            style={[
                                                tw`w-5 h-5 rounded-md border items-center justify-center mr-3`,
                                                isChecked
                                                    ? tw`bg-primary border-primary`
                                                    : tw`bg-white border-[#D1D5DB]`,
                                            ]}
                                        >
                                            {isChecked && (
                                                <Feather name="check" size={13} color="#FFFFFF" />
                                            )}
                                        </View>

                                        {/* Ingredient Text with Number */}
                                        <Text
                                            style={[
                                                tw`flex-1 text-[13.5px] leading-relaxed`,
                                                isChecked
                                                    ? tw`text-[#9CA3AF] line-through`
                                                    : tw`text-[#374151] font-normal`,
                                            ]}
                                        >
                                            {`${index + 1}.  ${ingredient}`}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    {/* Instructions Section Card */}
                    {showInstructions && (
                        <View style={tw`bg-[#F2EFE9] rounded-2xl p-4.5 mb-4 border border-[#E8E4DB]`}>
                            <Text style={tw`text-[15px] font-bold text-[#1F2937] mb-3`}>
                                Instructions
                            </Text>

                            <View style={tw`gap-3`}>
                                {recipe.instructions?.map((instruction, index) => (
                                    <View key={`instruction-${index}`} style={tw`flex-row items-start`}>
                                        <Text style={tw`text-[13px] font-semibold text-[#1F2937] w-5 mt-0.5`}>
                                            {index + 1}.
                                        </Text>
                                        <Text style={tw`flex-1 text-[13px] text-[#4B5563] leading-5 font-normal`}>
                                            {instruction}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Hide/Show Instructions Toggle Button */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setShowInstructions((prev) => !prev)}
                        style={tw`bg-white border border-[#E5E0D8] rounded-full py-2.5 px-5 self-center flex-row items-center shadow-sm mb-6`}
                    >
                        <Text style={tw`text-xs font-semibold text-[#4B5563] mr-1.5`}>
                            {showInstructions ? "Hide instructions" : "Show instructions"}
                        </Text>
                        <Feather
                            name={showInstructions ? "chevron-up" : "chevron-down"}
                            size={16}
                            color="#4B5563"
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Floating Bottom Action CTA "Let's cook" */}
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
