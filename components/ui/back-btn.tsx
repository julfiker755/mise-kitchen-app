import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import tw from './tailwind';

interface BackBtnProps {
    onClick?: () => void;
}

export default function BackBtn({ onClick }: BackBtnProps) {
    const router = useRouter();

    const handleBack = () => {
        if (onClick) return onClick();
        if (router.canGoBack()) router.back();
    };

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleBack}
            style={tw`w-10 h-10 items-center justify-center -ml-2`}
            accessibilityRole="button"
            accessibilityLabel="Go back"
        >
            <Feather name="arrow-left" size={24} color="#1F2937" />
        </TouchableOpacity>
    );
}