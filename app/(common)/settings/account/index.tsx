import BackBtn from "@/components/ui/back-btn";
import { FormInput } from "@/components/ui/from-input";
import tw from "@/components/ui/tailwind";
import useUserStore from "@/zustand/useAuthStore";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import {
    Alert,
    Image,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

const AccountSettingsSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
});

const AccountSettings = () => {
    const router = useRouter();
    const { user, setUser } = useUserStore();
    const [avatarUri, setAvatarUri] = useState(
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
    );

    const initialValues = {
        name: user?.name || "Md. Abid Hasan",
        email: user?.email || "example@gmail.com",
    };

    const handleSave = (values: { name: string; email: string }) => {
        setUser({
            name: values.name,
            email: values.email,
        });
        Alert.alert("Success", "Account settings updated successfully!", [
            { text: "OK", onPress: () => router.back() },
        ]);
    };

    const handleChangeAvatar = () => {
        Alert.alert("Change Photo", "Profile photo update options", [
            { text: "Take Photo", onPress: () => { } },
            { text: "Choose from Library", onPress: () => { } },
            { text: "Cancel", style: "cancel" },
        ]);
    };

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: "#FAF7F2" }]}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />

            {/* Header */}
            <View style={tw`flex-row items-center justify-between px-5 pt-2 pb-4`}>
                <BackBtn />
                <Text
                    style={tw`text-[#1F2937] text-xl font-bold tracking-tight text-center`}
                >
                    Account settings
                </Text>
                <View style={tw`w-10`} />
            </View>

            <Formik
                initialValues={initialValues}
                validationSchema={AccountSettingsSchema}
                onSubmit={handleSave}
                enableReinitialize
            >
                {(formik) => (
                    <KeyboardAwareScrollView
                        bottomOffset={20}
                        contentContainerStyle={tw`flex-grow px-5 pb-8 justify-between`}
                        showsVerticalScrollIndicator={false}
                    >
                        <View>
                            <View style={tw`items-center my-6`}>
                                <View style={tw`relative`}>
                                    <Image
                                        source={{ uri: avatarUri }}
                                        style={tw`w-28 h-28 rounded-full`}
                                        resizeMode="cover"
                                    />
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={handleChangeAvatar}
                                        style={tw`absolute -bottom-1 -right-1 bg-white rounded-xl p-2 shadow-md border border-[#F0ECE6] items-center justify-center`}
                                    >
                                        <Feather name="edit-2" size={16} color="#4B5563" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Form Input Fields */}
                            <View style={tw`w-full gap-4 mt-2`}>
                                <FormInput
                                    name="name"
                                    formik={formik}
                                    label="Name"
                                    placeholder="Enter your name"
                                />

                                <FormInput
                                    name="email"
                                    formik={formik}
                                    label="Email"
                                    placeholder="Enter your email address"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        {/* Save Changes Button */}
                        <View style={tw`w-full pt-6`}>
                            <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={() => formik.handleSubmit()}
                                style={tw`bg-primary rounded-full h-[52px] items-center justify-center shadow-sm`}
                            >
                                <Text style={tw`text-white font-semibold text-[16px]`}>
                                    Save changes
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
                )}
            </Formik>
        </SafeAreaView>
    );
};

export default AccountSettings;
