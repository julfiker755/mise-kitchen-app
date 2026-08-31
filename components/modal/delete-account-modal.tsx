import { Button } from "@/components/ui/button";
import tw from "@/components/ui/tailwind";
import FavIcon from "@/icon/favIcon";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

export interface DeleteAccountModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (password: string) => void;
}

export function DeleteAccountModal({
    visible,
    onClose,
    onConfirm,
}: DeleteAccountModalProps) {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClose = () => {
        setPassword("");
        setShowPassword(false);
        onClose();
    };

    const handleDelete = () => {
        onConfirm(password);
        setPassword("");
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={handleClose}
        >
            <TouchableWithoutFeedback onPress={handleClose}>
                <View
                    style={tw`flex-1 bg-black/50 justify-center items-center px-6`}
                >
                    <TouchableWithoutFeedback>
                        <View
                            style={tw`w-full max-w-[340px] bg-[#FAF7F2] rounded-[28px] p-6 items-center shadow-xl`}
                        >
                            <View style={tw`mb-4 mt-1`}>
                                <FavIcon width={72} height={72} name="delete" />
                            </View>

                            <Text
                                style={tw`text-[#1F2937] text-[22px] font-bold text-center mb-1.5`}
                            >
                                Delete your account?
                            </Text>

                            <Text style={tw`text-[#6B7280] text-[13px] text-center mb-2`}>
                                Your all data will be lost.
                            </Text>

                            <Text
                                style={tw`text-[#6B7280] text-[12px] text-center mb-5 leading-4 px-2`}
                            >
                                For deleting your account please enter your current password here.
                            </Text>

                            <View
                                style={tw`w-full bg-white rounded-full h-[48px] px-4 flex-row items-center border border-[#E5E7EB] mb-6`}
                            >
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={18}
                                    color="#9CA3AF"
                                    style={tw`mr-2`}
                                />
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Current password"
                                    placeholderTextColor="#9CA3AF"
                                    secureTextEntry={!showPassword}
                                    style={tw`flex-1 text-[#1F2937] text-[14px] h-full`}
                                />
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => setShowPassword((prev) => !prev)}
                                    style={tw`p-1`}
                                >
                                    <Ionicons
                                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                                        size={18}
                                        color="#9CA3AF"
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={tw`flex-row w-full gap-3`}>
                                <Button
                                    onPress={handleClose}
                                    variant="link"
                                    style={tw`flex-1 bg-white border border-[#E5E7EB] rounded-full h-[48px]`}
                                    textStyle={tw`text-[#4B5563] text-[15px] font-semibold`}
                                    label="Cancel"
                                />

                                <Button
                                    onPress={handleDelete}
                                    style={tw`flex-1 bg-[#FF4040] rounded-full h-[48px] shadow-sm`}
                                    textStyle={tw`text-white text-[15px] font-semibold`}
                                    label="Delete"
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
