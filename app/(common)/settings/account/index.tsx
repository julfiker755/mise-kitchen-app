import NavHeading from "@/components/common/account/nav-heading";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/from-input";
import sonner from "@/components/ui/sonner";
import tw from "@/components/ui/tailwind";
import useUserStore from "@/zustand/useAuthStore";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
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
    const [avatar, setAvatar] = useState({
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
        img: null
    });

    const initialValues = {
        name: user?.name || "Md. Abid Hasan",
        email: user?.email || "example@gmail.com",
    };

    const handleSave = (values: { name: string; email: string }) => {
        setUser({
            name: values.name,
            email: values.email,
        });
        console.log({
            values,
            img: avatar.img,
        })
        sonner.success("Account settings updated successfully!")

    };

    const handleChangeAvatar = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
                Alert.alert(
                    "Permission Denied",
                    "You need to allow media library permissions to change your profile picture."
                );
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            console.log("ImagePicker Result:", result);

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const selectedUri = result.assets[0].uri;
                console.log("Selected Image URI:", selectedUri);
                setAvatar({ url: selectedUri, img: result.assets[0] as any });
            }
        } catch (error) {
            console.log("Error picking image:", error);
        }
    };

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: "#FAF7F2" }]}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
            <NavHeading title="Account settings" />

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
                                        source={{ uri: avatar.url }}
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
                        </View >

                        <Button
                            onPress={() => {
                                formik.handleSubmit()

                            }}
                            style={tw`rounded-full w-full mt-6 h-[52px] shadow-sm`}
                        >
                            <Text style={tw`text-white font-semibold text-[16px]`}>
                                Save changes
                            </Text>
                        </Button>
                    </KeyboardAwareScrollView >
                )}
            </Formik >
        </SafeAreaView >
    );
};

export default AccountSettings;
