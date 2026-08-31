import { BackBtn } from '@/components/ui';
import tw from '@/components/ui/tailwind';
import React from 'react';
import { Text, View } from 'react-native';


interface NavBerProps {
    title: string;
    titleStyle?: any;
    mainStyle?: any;
}


const NavHeading = ({ title, titleStyle, mainStyle }: NavBerProps) => {
    return (
        <View style={[tw`flex-row items-center justify-between px-5 pt-2 pb-4`, mainStyle]}>
            <BackBtn />
            <Text
                style={[tw`text-[#1F2937] text-xl font-bold tracking-tight text-center`, titleStyle]}
            >
                {title}
            </Text>
            <View style={tw`w-10`} />
        </View>
    );
}

export default NavHeading
