import LoginUserAccount from "@/components/common/account/login-user";
import tw from "@/components/ui/tailwind";
import { Insets } from "@/utils";
import React from "react";
import { StatusBar, Text, View } from "react-native";

export default function CreatorAccountScreen() {
  return (
    <View style={[tw`flex-1 bg-[#FAF7F2]`, { paddingTop: Insets.useTop(0, 0) }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" translucent={true} />

      <View style={tw`items-center justify-center pt-2 pb-5 px-5`}>
        <Text
          style={tw`text-[#1F2937] text-xl font-bold tracking-tight text-center`}
        >
          Creator Account
        </Text>
      </View>

      <LoginUserAccount />
    </View>
  );
}
