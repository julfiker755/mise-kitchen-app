import tw from "@/components/ui/tailwind";
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
    Text,
    TouchableOpacity,
    View
} from "react-native";

type MenuItemProps = {
    icon: React.ReactNode;
    iconStyle?: any;
    title: string;
    subtitle: string;
    titleStyle?: any;
    onPress?: () => void;
};

export function MenuItem({
    icon,
    iconStyle,
    title,
    subtitle,
    titleStyle,
    onPress,
}: MenuItemProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            style={tw`bg-white rounded-2xl px-4 py-3.5 flex-row items-center justify-between shadow-none`}
        >
            <View style={tw`flex-row items-center flex-1 pr-2`}>
                <View
                    style={[
                        tw`w-11 h-11 rounded-full bg-[#F4F3EE] items-center justify-center mr-3.5`,
                        iconStyle,
                    ]}
                >
                    {icon}
                </View>
                <View style={tw`flex-1`}>
                    <Text style={[tw`text-[15px] font-bold text-[#1E2022]`, titleStyle]}>
                        {title}
                    </Text>
                    <Text style={tw`text-[12px] text-[#8C8C8C] mt-0.5`}>{subtitle}</Text>
                </View>
            </View>
            <Feather name="chevron-right" size={20} color="#71717A" />
        </TouchableOpacity>
    );
}
