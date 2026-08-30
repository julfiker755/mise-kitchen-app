import { MenuItem } from "@/components/reuseable/menu-card";
import tw from "@/components/ui/tailwind";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Alert,
    Image,
    ScrollView,
    Text,
    View
} from "react-native";

export default function LoginUserAccount() {
    const router = useRouter();

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Logout",
                style: "destructive",
                onPress: () => router.replace("/(auth)/login"),
            },
        ]);
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => router.replace("/(auth)/login"),
                },
            ]
        );
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`px-5 pb-12`}
        >
            <View style={tw`items-center mb-6`}>
                <Image
                    source={{
                        uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop",
                    }}
                    style={tw`size-23 rounded-full`}
                    resizeMode="cover"
                />

                <Text style={tw`text-[19px] font-bold text-[#1E2022] mt-3 text-center`}>
                    Tom Holand
                </Text>
                <Text style={tw`text-[13px] text-[#7A7A7A] mt-0.5 text-center`}>
                    example@gmail.com
                </Text>
            </View>

            <View style={tw`w-full gap-3`}>
                <MenuItem
                    title="Account settings"
                    subtitle="Edit your profile information's"
                    icon={<Feather name="user" size={19} />}
                    onPress={() => router.push({
                        pathname: "/(common)/settings/account",
                    })}
                />

                <MenuItem
                    title="Settings"
                    subtitle="Change password, privacy policy, faq..."
                    icon={<Ionicons name="settings-outline" size={20} color="#1E2022" />}
                    onPress={() => router.push({
                        pathname: "/(common)/settings",
                    })}
                />

                <MenuItem
                    title="Support"
                    subtitle="Facing any issue? Contact with platform admin"
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
                    title="Delete account"
                    subtitle="Delete your account from Mise."
                    icon={<Feather name="trash-2" size={19} color="#FF3B30" />}
                    iconStyle={tw`bg-[#FFF1F0]`}
                    titleStyle={tw`text-[#FF3B30]`}
                    onPress={handleDeleteAccount}
                />

                <MenuItem
                    title="Logout"
                    subtitle="After logging out you have to login again with your credentials"
                    icon={<Feather name="log-out" size={19} color="#FFFFFF" />}
                    iconStyle={tw`bg-[#FA3E3E]`}
                    titleStyle={tw`text-[#FF3B30]`}
                    onPress={handleLogout}
                />
            </View>
        </ScrollView>
    );
}
