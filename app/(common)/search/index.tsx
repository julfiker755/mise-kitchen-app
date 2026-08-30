import { popularRecipes, Recipe } from "@/components/data";
import { RecipeCard } from "@/components/reuseable/recipe-card";
import tw from "@/components/ui/tailwind";
import { Insets } from "@/utils";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const INITIAL_RECENT_SEARCHES = [
  "Spicy Mango Salsa",
  "Creamy Garlic Pasta",
  "Zesty Lemon Chicken",
  "Savory Mushroom Risotto",
];

export default function SearchScreen() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>(
    INITIAL_RECENT_SEARCHES
  );
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const handleBack = () => {
    Keyboard.dismiss();
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/home");
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRemoveRecent = (itemToRemove: string) => {
    setRecentSearches((prev) => prev.filter((item) => item !== itemToRemove));
  };

  const handleClearAll = () => {
    setRecentSearches([]);
  };

  const handleSelectRecent = (term: string) => {
    setSearchQuery(term);
  };

  const handleSubmitSearch = () => {
    const trimmed = searchQuery.trim();
    if (trimmed && !recentSearches.includes(trimmed)) {
      setRecentSearches((prev) => [trimmed, ...prev]);
    }
  };

  // Filter recipes based on query
  const filteredRecipes = popularRecipes.filter((recipe: Recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const isSearching = searchQuery.trim().length > 0;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[tw`flex-1 bg-[#FAF7F2]`, { paddingTop: Insets.useTop(3) }]}>
        <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />

        {/* Top Header Bar */}
        <View style={tw`flex-row items-center justify-between px-5 pt-3 pb-4`}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleBack}
            style={tw`w-10 h-10 items-center justify-center -ml-2`}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Feather name="arrow-left" size={24} color="#1F2937" />
          </TouchableOpacity>

          <Text style={tw`text-[#1F2937] text-xl font-bold tracking-tight`}>
            Search
          </Text>

          <View style={tw`w-10`} />
        </View>

        {/* Search Input Bar */}
        <View style={tw`px-5 mb-5`}>
          <View
            style={tw`bg-white rounded-full flex-row items-center px-4 h-13 shadow-sm border border-[#EBE6DC]`}
          >
            <Feather
              name="search"
              size={20}
              color="#374151"
              style={tw`mr-2`}
            />
            <TextInput
              placeholder="Search for recipes"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSubmitSearch}
              returnKeyType="search"
              autoFocus={true}
              style={tw`flex-1 text-[15px] text-[#1F2937] h-full`}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery("")}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={tw`p-1`}
              >
                <Feather name="x" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Content Body */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={tw`px-5 pb-10`}
        >
          {!isSearching ? (
            /* Recent Searches Section (Matches exact design in photo) */
            <View style={tw`mt-1`}>
              {recentSearches.length > 0 ? (
                <>
                  <View style={tw`flex-row justify-between items-center mb-2`}>
                    <Text style={tw`text-[#4B5563] text-base font-bold`}>
                      Recent searches
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={handleClearAll}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Text style={tw`text-[#EF4444] text-[15px] font-semibold`}>
                        Clear all
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={tw`mt-1`}>
                    {recentSearches.map((item, index) => (
                      <View
                        key={`${item}-${index}`}
                        style={tw`flex-row justify-between items-center py-3.5`}
                      >
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => handleSelectRecent(item)}
                          style={tw`flex-1 mr-3`}
                        >
                          <Text style={tw`text-[#374151] text-[15px] font-normal`}>
                            {item}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => handleRemoveRecent(item)}
                          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                          style={tw`p-1`}
                        >
                          <Feather name="x" size={18} color="#6B7280" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </>
              ) : (
                <View style={tw`items-center justify-center py-16`}>
                  <Feather name="search" size={40} color="#D1D5DB" style={tw`mb-3`} />
                  <Text style={tw`text-[#9CA3AF] text-sm font-medium`}>
                    No recent searches
                  </Text>
                </View>
              )}
            </View>
          ) : (
            /* Filtered Search Results Section */
            <View style={tw`mt-1`}>
              <View style={tw`flex-row justify-between items-center mb-4`}>
                <Text style={tw`text-[#374151] text-base font-bold`}>
                  Results ({filteredRecipes.length})
                </Text>
              </View>

              {filteredRecipes.length > 0 ? (
                <View style={tw`flex-row flex-wrap justify-between`}>
                  {filteredRecipes.map((recipe: Recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      item={recipe}
                      isFavorite={!!favorites[recipe.id]}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </View>
              ) : (
                <View style={tw`items-center justify-center py-16`}>
                  <Feather name="alert-circle" size={44} color="#D1D5DB" style={tw`mb-3`} />
                  <Text style={tw`text-[#4B5563] text-base font-semibold mb-1`}>
                    No recipes found
                  </Text>
                  <Text style={tw`text-[#9CA3AF] text-sm text-center px-6`}>
                    We couldn't find any recipes matching "{searchQuery}". Try searching for something else!
                  </Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
