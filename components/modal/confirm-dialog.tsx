import tw from "@/components/ui/tailwind";
import FavIcon from "@/icon/favIcon";
import React, { createContext, ReactNode, useContext, useState } from "react";
import {
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

// ✅ Types
export interface ConfirmDialogOptions {
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: "destructive" | "primary";
    icon?: "delete" | "logout" | React.ReactNode;
    titleStyle?: any;
    descriptionStyle?: any;
    containerStyle?: any;
    confirmButtonStyle?: any;
    cancelButtonStyle?: any;
    confirmButtonTextStyle?: any;
    cancelButtonTextStyle?: any;
    onConfirm?: () => void;
    onCancel?: () => void;
}

interface ConfirmDialogState extends ConfirmDialogOptions {
    open: boolean;
    resolve?: (value: boolean) => void;
}

interface ConfirmDialogContextType {
    confirm: (options?: ConfirmDialogOptions) => Promise<boolean>;
}

// ✅ Default State
const initialDialogState: ConfirmDialogState = {
    open: false,
    title: "Delete recipe ?",
    description:
        "After deleting this recipe will no longer available in this application.",
    confirmText: "Delete",
    cancelText: "Cancel",
    confirmVariant: "destructive",
    icon: "delete",
    onConfirm: undefined,
    onCancel: undefined,
    resolve: undefined,
};

const ConfirmDialogContext = createContext<
    ConfirmDialogContextType | undefined
>(undefined);

interface ConfirmDialogProviderProps {
    children: ReactNode;
}

export const ConfirmDialogProvider: React.FC<ConfirmDialogProviderProps> = ({
    children,
}) => {
    const [dialogState, setDialogState] =
        useState<ConfirmDialogState>(initialDialogState);

    const confirm = (options: ConfirmDialogOptions = {}): Promise<boolean> => {
        return new Promise((resolve) => {
            setDialogState({
                ...initialDialogState,
                ...options,
                open: true,
                resolve,
            });
        });
    };

    const closeDialog = () => {
        setDialogState(initialDialogState);
    };

    // ✅ Confirm & Cancel Handlers
    const handleConfirm = () => {
        const resolve = dialogState.resolve;
        const onConfirm = dialogState.onConfirm;
        closeDialog();
        resolve?.(true);
        onConfirm?.();
    };

    const handleCancel = () => {
        const resolve = dialogState.resolve;
        const onCancel = dialogState.onCancel;
        closeDialog();
        resolve?.(false);
        onCancel?.();
    };

    const renderIcon = () => {
        if (!dialogState.icon) return null;

        if (typeof dialogState.icon === "string") {
            return (
                <FavIcon
                    name={dialogState.icon as "delete" | "logout"}
                    width={76}
                    height={76}
                />
            );
        }

        return dialogState.icon;
    };

    return (
        <ConfirmDialogContext.Provider value={{ confirm }}>
            {children}
            <Modal
                visible={dialogState.open}
                transparent
                animationType="fade"
                onRequestClose={handleCancel}
            >
                <TouchableWithoutFeedback onPress={handleCancel}>
                    <View
                        style={tw`flex-1 bg-black/50 justify-center items-center px-6`}
                    >
                        <TouchableWithoutFeedback>
                            <View
                                style={[
                                    tw`w-full max-w-[340px] bg-[#FAF7F2] rounded-[28px] p-6 items-center shadow-xl border border-[#EDE8DE]`,
                                    dialogState.containerStyle,
                                ]}
                            >
                                {/* Top Icon */}
                                <View style={tw`mb-3.5 mt-1 items-center justify-center`}>
                                    {renderIcon()}
                                </View>

                                {/* Title */}
                                <Text
                                    style={[
                                        tw`text-[#1F2937] text-[22px] font-bold text-center mb-1.5`,
                                        dialogState.titleStyle,
                                    ]}
                                >
                                    {dialogState.title}
                                </Text>

                                {/* Description */}
                                <Text
                                    style={[
                                        tw`text-[#6B7280] text-[13.5px] text-center mb-6 leading-5 px-2`,
                                        dialogState.descriptionStyle,
                                    ]}
                                >
                                    {dialogState.description}
                                </Text>

                                {/* Action Buttons */}
                                <View style={tw`flex-row w-full gap-3`}>
                                    {/* Cancel Button */}
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={handleCancel}
                                        style={[
                                            tw`flex-1 bg-white border border-[#E5E7EB] rounded-full h-[48px] items-center justify-center`,
                                            dialogState.cancelButtonStyle,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                tw`text-[#4B5563] text-[15px] font-semibold`,
                                                dialogState.cancelButtonTextStyle,
                                            ]}
                                        >
                                            {dialogState.cancelText ?? "Cancel"}
                                        </Text>
                                    </TouchableOpacity>

                                    {/* Confirm / Delete Button */}
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={handleConfirm}
                                        style={[
                                            tw`flex-1 rounded-full h-[48px] items-center justify-center shadow-sm`,
                                            dialogState.confirmVariant === "primary"
                                                ? tw`bg-primary`
                                                : tw`bg-[#FF4040]`,
                                            dialogState.confirmButtonStyle,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                tw`text-white text-[15px] font-semibold`,
                                                dialogState.confirmButtonTextStyle,
                                            ]}
                                        >
                                            {dialogState.confirmText ?? "Delete"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </ConfirmDialogContext.Provider>
    );
};

// ✅ Hook
export const useConfirmation = (): ConfirmDialogContextType => {
    const context = useContext(ConfirmDialogContext);
    if (!context) {
        throw new Error(
            "useConfirmation must be used within a ConfirmDialogProvider"
        );
    }
    return context;
};

export default useConfirmation;
