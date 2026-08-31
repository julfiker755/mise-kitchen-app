import { Button } from "@/components/ui/button";
import tw from "@/components/ui/tailwind";
import FavIcon from "@/icon/favIcon";
import React from "react";
import {
    Modal,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";

export interface LogoutModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function LogoutModal({ visible, onClose, onConfirm }: LogoutModalProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View
                    style={tw`flex-1 bg-black/50 justify-center items-center px-6`}
                >
                    <TouchableWithoutFeedback>
                        <View
                            style={tw`w-full max-w-[340px] bg-[#FAF7F2] rounded-[28px] p-6 items-center shadow-xl`}
                        >
                            <View style={tw`mb-4 mt-1`}>
                                <FavIcon width={72} height={72} name="logout" />
                            </View>

                            <Text
                                style={tw`text-[#1F2937] text-[22px] font-bold text-center mb-1.5`}
                            >
                                Logout?
                            </Text>

                            <Text
                                style={tw`text-[#6B7280] text-[13px] text-center mb-6 leading-5`}
                            >
                                You have to login again with your credentials.
                            </Text>

                            <View style={tw`flex-row w-full gap-3`}>
                                <Button
                                    onPress={onClose}
                                    variant="link"
                                    style={tw`flex-1 bg-white border border-[#E5E7EB] rounded-full h-[48px]`}
                                    textStyle={tw`text-[#4B5563] text-[15px] font-semibold`}
                                    label="Cancel"
                                />

                                <Button
                                    onPress={onConfirm}
                                    style={tw`flex-1 bg-[#FF4040] rounded-full h-[48px] shadow-sm`}
                                    textStyle={tw`text-white text-[15px] font-semibold`}
                                    label="Logout"
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
