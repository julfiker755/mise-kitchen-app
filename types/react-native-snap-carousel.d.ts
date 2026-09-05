declare module 'react-native-snap-carousel' {
    import { Component } from 'react';
    import { StyleProp, ViewStyle } from 'react-native';

    export interface CarouselProps<T> {
        data: T[];
        renderItem: (item: { item: T; index: number }, parallaxProps?: any) => React.ReactNode;
        sliderWidth: number;
        itemWidth: number;
        onSnapToItem?: (index: number) => void;
        firstItem?: number;
        loop?: boolean;
        autoplay?: boolean;
        autoplayDelay?: number;
        autoplayInterval?: number;
        containerCustomStyle?: StyleProp<ViewStyle>;
        contentContainerCustomStyle?: StyleProp<ViewStyle>;
        inactiveSlideScale?: number;
        inactiveSlideOpacity?: number;
        activeSlideAlignment?: 'center' | 'end' | 'start';
        vertical?: boolean;
        hasParallaxImages?: boolean;
        [key: string]: any;
    }

    export default class Carousel<T> extends Component<CarouselProps<T>> {
        snapToNext(animated?: boolean, fireCallback?: boolean): void;
        snapToPrev(animated?: boolean, fireCallback?: boolean): void;
        snapToItem(index: number, animated?: boolean, fireCallback?: boolean): void;
        currentIndex: number;
    }

    export interface PaginationProps {
        dotsLength: number;
        activeDotIndex: number;
        containerStyle?: StyleProp<ViewStyle>;
        dotStyle?: StyleProp<ViewStyle>;
        inactiveDotStyle?: StyleProp<ViewStyle>;
        inactiveDotOpacity?: number;
        inactiveDotScale?: number;
        carouselRef?: any;
        tappableDots?: boolean;
        [key: string]: any;
    }

    export class Pagination extends Component<PaginationProps> {}
    export class ParallaxImage extends Component<any> {}
}
