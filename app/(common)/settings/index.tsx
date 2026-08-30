import { MenuItem } from "@/components/reuseable/menu-card";
import BackBtn from "@/components/ui/back-btn";
import tw from "@/components/ui/tailwind";
import { Insets } from "@/utils";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StatusBar,
    Text,
    View,
} from "react-native";

export default function SettingsScreen() {
    const router = useRouter();

    return (
        <View style={[tw`flex-1 bg-[#FAF7F2]`, { paddingTop: Insets.useTop(0, 0) }]}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
            <View style={tw`flex-row items-center justify-between px-5 pt-2 pb-4`}>
                <BackBtn />

                <Text
                    style={tw`text-[#1F2937] text-xl font-bold tracking-tight text-center`}
                >
                    Settings
                </Text>

                <View style={tw`w-10`} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={tw`px-5 pt-3 pb-12`}
            >
                <View style={tw`w-full gap-3`}>
                    <MenuItem
                        title="Change password"
                        subtitle="Change your account password"
                        icon={<Ionicons name="key-outline" size={20} color="#1E2022" />}
                        onPress={() => {
                            router.push("/(common)/settings/change-password");
                        }}
                    />

                    <MenuItem
                        title="About us"
                        subtitle="See our about us here"
                        icon={<Feather name="settings" size={19} color="#1E2022" />}
                        onPress={() => { }}
                    />

                    <MenuItem
                        title="FAQ"
                        subtitle="See frequently asked questions here"
                        icon={
                            <Ionicons
                                name="chatbubble-ellipses-outline"
                                size={19}
                                color="#1E2022"
                            />
                        }
                        onPress={() => { }}
                    />
                    <MenuItem
                        title="Privacy policy"
                        subtitle="See our privacy policy here"
                        icon={
                            <Ionicons
                                name="chatbubble-ellipses-outline"
                                size={19}
                                color="#1E2022"
                            />
                        }
                        onPress={() => { }}
                    />
                </View>
            </ScrollView>
        </View>
    );
}