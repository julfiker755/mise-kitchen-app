<<<<<<< HEAD
import NavHeading from "@/components/common/account/nav-heading";
import { changepassword_sc } from "@/components/schema";
import { Box } from "@/components/ui";
import { Button } from "@/components/ui/button";
=======
import { changepassword_sc } from "@/components/schema";
import { Box } from "@/components/ui";
import BackBtn from "@/components/ui/back-btn";
>>>>>>> 5b49fa8a84ad154d30389c281e9af2bfcc6e5bfe
import { FormInput } from "@/components/ui/from-input";
import tw from "@/components/ui/tailwind";
import FavIcon from "@/icon/favIcon";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
    StatusBar,
    Text,
<<<<<<< HEAD
=======
    TouchableOpacity,
>>>>>>> 5b49fa8a84ad154d30389c281e9af2bfcc6e5bfe
    View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";



const ChangePassword = () => {
    const router = useRouter();

    const initialValues = {
        current_password: "",
        password: "",
        c_password: "",
    };

    const handleUpdatePassword = (values: typeof initialValues, { resetForm }: any) => {
        console.log("Password Update Attempt:", values);
        // resetForm();

    };

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: "#FAF7F2" }]}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />

<<<<<<< HEAD
            <NavHeading title="Change password" />
=======
            {/* Header */}
            <View style={tw`flex-row items-center justify-between px-5 pt-2 pb-4`}>
                <BackBtn />
                <Text
                    style={tw`text-[#1F2937] text-xl font-bold tracking-tight text-center`}
                >
                    Change password
                </Text>
                <View style={tw`w-10`} />
            </View>

>>>>>>> 5b49fa8a84ad154d30389c281e9af2bfcc6e5bfe
            <Formik
                initialValues={initialValues}
                validationSchema={changepassword_sc}
                onSubmit={handleUpdatePassword}
            >
                {(formik) => (
                    <KeyboardAwareScrollView
                        bottomOffset={20}
                        contentContainerStyle={tw`flex-grow px-5 pb-8 justify-between`}
                        showsVerticalScrollIndicator={false}
                    >
                        <View>
                            {/* Key Icon Badge */}
                            <Box style={tw`items-center size-18 mx-auto rounded-full justify-center bg-white my-6`}>
                                <FavIcon width={40} height={40} name="change" />
                            </Box>
                            <View style={tw`w-full gap-4 mt-2`}>
                                <FormInput
                                    name="current_password"
                                    formik={formik}
                                    label="Current password"
                                    placeholder="Enter your current password"
                                    secure
                                />

                                <FormInput
                                    name="password"
                                    formik={formik}
                                    label="New Password"
                                    placeholder="Enter your new password"
                                    secure
                                />

                                <FormInput
                                    name="c_password"
                                    formik={formik}
                                    label="Confirm Password"
                                    placeholder="Enter the password again"
                                    secure
                                />
                            </View>
                        </View>
<<<<<<< HEAD
                        <Button
                            onPress={() => formik.handleSubmit()}
                            style={tw`rounded-full w-full mt-6 h-[52px] shadow-sm`}
                        >
                            <Text style={tw`text-white font-semibold text-[16px]`}>
                                Update password
                            </Text>
                        </Button>
=======
                        <View style={tw`w-full pt-6`}>
                            <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={() => formik.handleSubmit()}
                                style={tw`bg-primary rounded-full h-[52px] items-center justify-center shadow-sm`}
                            >
                                <Text style={tw`text-white font-semibold text-[16px]`}>
                                    Update password
                                </Text>
                            </TouchableOpacity>
                        </View>
>>>>>>> 5b49fa8a84ad154d30389c281e9af2bfcc6e5bfe
                    </KeyboardAwareScrollView>
                )}
            </Formik>
        </SafeAreaView>
    );
};

export default ChangePassword;
