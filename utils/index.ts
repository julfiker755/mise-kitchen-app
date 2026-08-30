import { useSafeAreaInsets } from "react-native-safe-area-context";

export class Insets {
    static useTop(min = 16, offset = 0): number {
        const insets = useSafeAreaInsets();
        return Math.max((insets?.top ?? 0) + offset, min);
    }

    static useBottom(min = 16, offset = 0): number {
        const insets = useSafeAreaInsets();
        return Math.max((insets?.bottom ?? 0) + offset, min);
    }
}
