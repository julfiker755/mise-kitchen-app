import { categories, popularRecipes, Recipe } from "@/components/data";
import { HomeFilterModal } from "@/components/modal";
import { RecipeCard } from "@/components/reuseable/recipe-card";
import { Box, Heading } from "@/components/ui";
import tw from "@/components/ui/tailwind";
import { useGlobalState } from "@/hooks/useModalState";
import FavIcon from "@/icon/favIcon";
import { Insets } from "@/utils";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const initState = {
  isFilterModalOpen: false
}

export default function Home() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [state, setState] = useGlobalState(initState)


  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSubmit = (value: any) => {
    console.log(value)
  }


  return (
    <View style={[tw`flex-1`]}>
      <StatusBar barStyle="light-content" backgroundColor="#5B7553" />

      {/* Header Container */}
      <View
        style={[
          tw`bg-primary px-5 pb-6 rounded-b-[25px] shadow-md`,
          { paddingTop: Insets.useTop(44, 8) },
        ]}
      >
        {/* User Profile Bar */}
        <View style={tw`flex-row items-center mb-5`}>
          <View
            style={tw`w-12 h-12 rounded-full bg-white items-center justify-center mr-3.5 shadow-sm`}
          >
            <Box>
              <FavIcon width={30} height={30} name="user_1" />
            </Box>
          </View>
          <View>
            <Text style={tw`text-white text-xl font-bold tracking-tight`}>
              Welcome
            </Text>
            <Text style={tw`text-white/80 text-xs font-normal mt-0.5`}>
              Good afternoon
            </Text>
          </View>
        </View>

        {/* Search & Filter Row */}
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push("/(common)/search" as any)}
            style={tw`flex-1 bg-white rounded-full flex-row items-center px-4 h-12 mr-3 shadow-sm`}
          >
            <Feather
              name="search"
              size={19}
              color="#6B7280"
              style={tw`mr-2.5`}
            />
            <Text style={tw`flex-1 text-sm text-gray-400`}>
              Search for recipes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              setState("isFilterModalOpen", true)
            }}
            style={tw`w-12 h-12 rounded-full bg-white items-center justify-center shadow-sm`}
          >
            <Feather name="sliders" size={18} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ==========  Categories Section ========= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-10 pt-4`}
      >

        <View style={tw`mb-5`}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`px-5`}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                activeOpacity={0.8}
                style={tw`bg-white rounded-full pl-1.5 pr-4 py-1.5 flex-row items-center mr-3`}
              >
                <Image
                  source={{ uri: category.image }}
                  style={tw`w-8 h-8 rounded-full mr-2.5`}
                  resizeMode="cover"
                />
                <Text style={tw`text-sm font-semibold text-gray-800`}>
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Recipes Section */}
        <View style={tw`px-5`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Heading variant="h3"> Popular recipes</Heading>
            <TouchableOpacity
              activeOpacity={0.7}
            // onPress={() => router.push("/(tabs)/explore")}
            >
              <Text style={tw`text-primary font-semibold text-sm`}>
                See all
              </Text>
            </TouchableOpacity>
          </View>

          <View style={tw`flex-row flex-wrap justify-between`}>
            {popularRecipes.map((recipe: Recipe) => (
              <RecipeCard
                key={recipe.id}
                item={recipe}
                isFavorite={!!favorites[recipe.id]}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Filter Bottom Sheet Modal */}
      <HomeFilterModal
        visible={state.isFilterModalOpen}
        onClose={() => setState("isFilterModalOpen", false)}
        categories={categories}
        handleSubmit={handleSubmit}
      />
    </View>
  );
}

