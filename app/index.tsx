import { assets } from "@/assets";
import { Button } from "@/components/ui";
import tw from "@/components/ui/tailwind";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={[tw`flex-1 justify-between px-6 py-4`, { backgroundColor: "#FAF7F2" }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />

      <View style={tw`items-center pt-2`}>
        <Image
          source={assets.logo}
          style={{ width: 300, height: 150 }}
          resizeMode="contain"
        />
      </View>

      <View style={tw`items-center justify-center flex-1 my-2`}>
        <Image
          source={assets.home_img}
          style={tw`w-full max-w-[320px] h-[330px]`}
          resizeMode="contain"
        />
      </View>

      <View style={tw`w-full pb-4`}>
        <Text style={tw`text-primary text-[30px] font-bold text-center leading-[36px] tracking-tight mb-3`}>
          Find Your Next Favorite Meal
        </Text>

        <Text style={tw`text-[#7A7A7A] text-[15px] text-center leading-[22px] px-2 mb-8`}>
          Browse hundreds of delicious recipes by category, ingredients, or your favorite creators.
        </Text>

        <Button
          onPress={() => router.push("/(tabs)/home")}
          style={tw`rounded-full h-12`}
        >
          <Text style={tw`text-white text-base font-semibold mr-2`}>
            Let&apos;s browse
          </Text>
          <Feather name="arrow-right" size={20} color="#FFFFFF" />
        </Button>
      </View>
    </SafeAreaView>
  );
}

