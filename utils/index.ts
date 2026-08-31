import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Yup from "yup";

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




export const getInit = (schema: Yup.ObjectSchema<any>) => {
    const fields = schema.fields;
    const initialValues: Record<string, any> = {};

    Object.keys(fields).forEach((key) => {
        const field = fields[key];
        if (typeof (field as any).default === "function") {
            initialValues[key] = (field as any).default() ?? "";
        } else {
            initialValues[key] = "";
        }
    });

    return initialValues;
};

const { width, height } = Dimensions.get("window");
const screen = Dimensions.get("screen");

export const window = {
    width,
    height,
    screen,
};


