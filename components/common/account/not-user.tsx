import { Heading } from "@/components/ui";
import tw from "@/components/ui/tailwind";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import {
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function NoUserAccount() {
    return (
        <View style={tw`flex-1 px-6 pt-4`}>
            <View style={tw`mb-6`}>
                <Ionicons name="person-circle-outline" size={60} color="#5B7553" />
            </View>
            <Heading
                variant="h2"
                style={tw`text-[26px] leading-8 font-bold text-[#1F2937] tracking-tight mb-3`}
            >
                Login into your account to access profile.
            </Heading>
            <Heading style={tw`text-sm text-[#71717A] leading-relaxed mb-8`}>
                There are two types of user. Please select one that suits best for you.
            </Heading>



            <View style={tw`gap-3.5`}>
                <Link
                    href={{
                        pathname: "/(auth)/login" as any,
                        params: { role: "user" },
                    }}
                    asChild
                >
                    <TouchableOpacity
                        activeOpacity={0.85}
                        style={tw`bg-primary w-full py-3.5 rounded-full flex-row items-center justify-center shadow-sm`}
                    >
                        <Text style={tw`text-white font-semibold text-[15px] mr-2`}>
                            Continue as user
                        </Text>
                        <Feather name="arrow-right" size={18} color="#FFFFFF" />
                    </TouchableOpacity>
                </Link>

                <Link
                    href={{
                        pathname: "/(auth)/login" as any,
                        params: { role: "creator" },
                    }}
                    asChild
                >
                    <TouchableOpacity
                        activeOpacity={0.85}
                        style={tw`bg-transparent border border-[#E5E0D8] w-full py-3.5 rounded-full flex-row items-center justify-center`}
                    >
                        <Text style={tw`text-[#374151] font-semibold text-[15px] mr-2`}>
                            Continue as creator
                        </Text>
                        <Feather name="arrow-right" size={18} color="#374151" />
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
}
