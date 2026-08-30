import { Heading } from "@/components/ui";
import BackBtn from "@/components/ui/back-btn";
import tw from "@/components/ui/tailwind";
import { Insets } from "@/utils";
import React from "react";
import {
    FlatList,
    Image,
    StatusBar,
    Text,
    View,
} from "react-native";



export const reviewsData: any[] = [
    {
        id: "1",
        avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
        rating: "4.0",
        comment:
            "Lorem ipsum dolor sit amet consectetur. Rutrum vitae tortor ut at turpis id quisque lacus. Cras bibendum amet.",
    },
    {
        id: "2",
        avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
        rating: "3.0",
        comment:
            "Phasellus bibendum sapien nec metus faucibus, a facilisis nisl convallis. Integer a magna eget nibh varius.",
    },
    {
        id: "3",
        avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
        rating: "5.0",
        comment:
            "Suspendisse potenti. Curabitur euismod turpis ut varius mattis, sed fermentum justo elementum.",
    },
    {
        id: "4",
        avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
        rating: "3.0",
        comment:
            "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
    },
    {
        id: "5",
        avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
        rating: "2.0",
        comment:
            "Donec non justo eget sapien cursus tincidunt. Pellentesque habitant morbi tristique senectus et netus.",
    },
    {
        id: "6",
        avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        rating: "4.5",
        comment:
            "Great experience overall. The service was smooth, professional, and exceeded my expectations.",
    },
    {
        id: "7",
        avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
        rating: "5.0",
        comment:
            "Excellent service and very friendly support. Everything was handled quickly and professionally.",
    },
    {
        id: "8",
        avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
        rating: "4.0",
        comment:
            "Really happy with the quality of service. The entire process was simple and convenient.",
    },
    {
        id: "9",
        avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        rating: "3.5",
        comment:
            "The overall experience was good. There is still some room for improvement, but the service was reliable.",
    },
    {
        id: "10",
        avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
        rating: "4.5",
        comment:
            "Very satisfied with the service. The team was responsive and made the whole experience easy.",
    },
    {
        id: "11",
        avatar:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
        rating: "5.0",
        comment:
            "Absolutely wonderful experience. Fast service, great communication, and excellent results.",
    },
    {
        id: "12",
        avatar:
            "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=200&auto=format&fit=crop",
        rating: "3.0",
        comment:
            "The service was decent and completed as expected. Customer support was helpful throughout the process.",
    },
    {
        id: "13",
        avatar:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
        rating: "4.0",
        comment:
            "A pleasant experience from start to finish. Everything was organized and easy to understand.",
    },
    {
        id: "14",
        avatar:
            "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=200&auto=format&fit=crop",
        rating: "4.5",
        comment:
            "The quality was impressive and the service was delivered on time. I would definitely recommend it.",
    },
    {
        id: "15",
        avatar:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
        rating: "5.0",
        comment:
            "Fantastic experience! Everything was handled professionally and I am very happy with the final result.",
    },
];

const ReviewList = () => {
    return (
        <View style={[tw`flex-1 bg-[#FAF7F2]`, { paddingTop: Insets.useTop(0, 0) }]}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />

            <View style={tw`flex-row items-center justify-between px-5 pt-2 pb-4`}>
                <BackBtn />

                <Text
                    style={tw`text-[#1F2937] text-xl font-bold tracking-tight text-center`}
                >
                    Reviews
                </Text>

                <View style={tw`w-10`} />
            </View>

            <FlatList
                data={reviewsData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View
                        key={item.id}
                        style={tw`bg-white rounded-2xl gap-3 p-4.5 mb-3.5 flex-row items-start`}
                    >

                        <Image
                            source={{ uri: item.avatar }}
                            style={tw`size-13 rounded-full`}
                            resizeMode="cover"
                        />
                        <View style={tw`flex-1`}>
                            <Heading variant="h3">{item.rating}</Heading>
                            <Text style={tw`text-sm leading-5 text-[#6B7280] font-normal`}>
                                {item.comment}
                            </Text>
                        </View>
                    </View>
                )}
                contentContainerStyle={tw`px-5 pt-1 pb-10`}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default ReviewList;
