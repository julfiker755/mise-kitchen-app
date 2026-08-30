import { popularRecipes, Recipe } from "@/components/data";
import { RecipeCard } from "@/components/reuseable/recipe-card";
import { Heading } from "@/components/ui";
import BackBtn from "@/components/ui/back-btn";
import tw from "@/components/ui/tailwind";
import { Insets } from "@/utils";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CreatorProfile() {
  const { name } = useLocalSearchParams<{ name?: string }>();


  const creatorInfo = {
    name: name || "Tom Holand",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop",
    bio: "Lorem ipsum dolor sit amet consectetur. Rutrum vitae tortor ut at turpis id quisque lacus. Cras bibendum amet ipsum et pellentesque congue elementum risus rhoncus.",
  };

  // Filter or show creator recipes
  const creatorRecipes = popularRecipes



  return (
    <View style={[tw`flex-1 bg-[#FAF7F2]`, { paddingTop: Insets.useTop(0, 0) }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />

      <View style={tw`flex-row items-center justify-between px-5 pt-2 pb-3`}>
        <BackBtn />

        <Text
          style={tw`text-[#1F2937] text-xl font-bold tracking-tight text-center`}
        >
          Creator profile
        </Text>

        <View style={tw`w-10`} />
      </View>

      <FlatList
        data={creatorRecipes}
        keyExtractor={(item: Recipe) => item.id}
        numColumns={2}
        ListHeaderComponent={<ProfileHeader item={creatorInfo} />}
        renderItem={({ item }: { item: Recipe }) => (
          <Link
            href={{
              pathname: "/(common)/details" as any,
              params: { id: item.id },
            }}
            asChild
          >
            <RecipeCard
              favoriteIcon={false}
              item={item}
            />
          </Link>
        )}
        columnWrapperStyle={tw`justify-between`}
        contentContainerStyle={tw`px-5 pb-10`}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}




const ProfileHeader = ({ item }: { item: any }) => {
  return (
    <View style={tw`items-center pt-2 pb-6`}>
      <Image
        source={{ uri: item.avatar }}
        style={tw`size-23 rounded-full`}
        resizeMode="cover"
      />

      <Heading variant="h3">{item.name}</Heading>

      <Text
        style={tw`text-sm text-[#71717A] text-center leading-5 px-6 max-w-sm mb-5`}
      >
        {item.bio}
      </Text>

      <View style={tw`flex-row items-center justify-center gap-4 mb-3`}>
        {[
          {
            name: "facebook",
            icon: <FontAwesome5 name="facebook" size={22} color="#1877F2" />,
            href: ""
          },
          {
            name: "youtube",
            icon: <FontAwesome5 name="youtube" size={20} color="#FF0000" />,
            href: ""
          },
          {
            name: "tiktok",
            icon: <Ionicons name="logo-tiktok" size={22} color="#000000" />,
            href: "",
          },
        ]?.map((item: any, index: number) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            style={tw`size-13  rounded-full bg-white items-center justify-center`}
          >
            {item.icon}
          </TouchableOpacity>

        ))}

      </View>

      <View style={tw`w-full flex-row justify-between items-center mt-4 px-1`}>
        <Text style={tw`text-lg font-bold text-[#1F2937] tracking-tight`}>
          Recipes from this creator
        </Text>
      </View>
    </View>

  );
}

