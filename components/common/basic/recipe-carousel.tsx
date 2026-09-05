import tw from "@/components/ui/tailwind";
import { window } from "@/utils";
import "@/utils/polyfill";
import React, { useRef, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-snap-carousel";

const SCREEN_WIDTH = window.width;

interface RecipeCarouselProps {
    images: string[];
    height?: number;
    onSlideChange?: (index: number) => void;
    autoPlay?: boolean;
    autoPlayInterval?: number;
}

export default function RecipeCarousel({
    images,
    height = 350,
    onSlideChange,
    autoPlay = true,
    autoPlayInterval = 3000,
}: RecipeCarouselProps) {
    const carouselRef = useRef<Carousel<string>>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSnapToItem = (index: number) => {
        setActiveIndex(index);
        if (onSlideChange) {
            onSlideChange(index);
        }
    };

    const handlePrev = () => {
        carouselRef.current?.snapToPrev();
    };

    const handleNext = () => {
        carouselRef.current?.snapToNext();
    };

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <View style={tw`relative w-full h-[${height}px] bg-gray-200 overflow-hidden`}>
            <Carousel
                ref={carouselRef}
                data={images}
                renderItem={({ item }: { item: string }) => (
                    <Image
                        source={{ uri: item }}
                        style={{ width: SCREEN_WIDTH, height }}
                        resizeMode="cover"
                    />
                )}
                sliderWidth={SCREEN_WIDTH}
                itemWidth={SCREEN_WIDTH}
                onSnapToItem={handleSnapToItem}
                loop={images.length > 1}
                autoplay={autoPlay && images.length > 1}
                autoplayDelay={1000}
                autoplayInterval={autoPlayInterval}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
            />

            {/* Left and Right Navigation Buttons */}
            {/* {images.length > 1 && (
                <>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handlePrev}
                        style={tw`absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 w-10 h-10 rounded-full items-center justify-center z-10`}
                        accessibilityLabel="Previous image"
                    >
                        <Feather name="chevron-left" size={24} color="#FFFFFF" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleNext}
                        style={tw`absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 w-10 h-10 rounded-full items-center justify-center z-10`}
                        accessibilityLabel="Next image"
                    >
                        <Feather name="chevron-right" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </>
            )} */}

            {/* Pagination Dots */}
            {images.length > 1 && (
                <View style={tw`absolute bottom-4 left-0 right-0 flex-row justify-center items-center gap-1.5 z-10`}>
                    {images.map((_, index) => (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.8}
                            onPress={() => carouselRef.current?.snapToItem(index)}
                            style={[
                                tw`h-2 rounded-full`,
                                activeIndex === index
                                    ? tw`w-6 bg-primary`
                                    : tw`w-2 bg-primary/60`,
                            ]}
                        />
                    ))}
                </View>
            )}
        </View>
    );
}
