import { View } from "react-native";

// Polyfill View.propTypes for legacy packages like react-native-snap-carousel
if (typeof (View as any).propTypes === "undefined") {
    (View as any).propTypes = { style: () => null };
}
