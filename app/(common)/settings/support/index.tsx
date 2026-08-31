import NavHeading from "@/components/common/account/nav-heading";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/from-input";
import tw from "@/components/ui/tailwind";
import { Feather } from "@expo/vector-icons";
import { Formik } from "formik";
import React from "react";
import {
    StatusBar,
    Text,
    View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

const supportValidationSchema = Yup.object().shape({
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
});

const initialValues = {
    subject: "",
    message: "",
};

const SupportScreen = () => {
    const handleSubmitSupport = (
        values: typeof initialValues,
        { resetForm }: any
    ) => {
        console.log("Support message submitted:", values);
        // resetForm();
    };

    return (
        <SafeAreaView style={[tw`flex-1 bg-[#FAF7F2]`]}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
            <NavHeading title="Support" />
            <Formik
                initialValues={initialValues}
                validationSchema={supportValidationSchema}
                onSubmit={handleSubmitSupport}
            >
                {(formik) => (
                    <KeyboardAwareScrollView
                        bottomOffset={20}
                        contentContainerStyle={tw`flex-grow px-5 pt-2 pb-8 justify-between`}
                        showsVerticalScrollIndicator={false}
                    >
                        <View>
                            <Text style={tw`text-[#1F2937] text-[24px] font-bold mb-2`}>
                                Facing any issue?
                            </Text>
                            <Text style={tw`text-gray-500 text-[14px] leading-5 mb-6`}>
                                Please contact the platform administrator and describe your issue
                                in detail. It may take up to three business days to receive a
                                response. Kindly remain patient during this time.
                            </Text>
                            <View style={tw`gap-4`}>
                                <FormInput
                                    name="subject"
                                    formik={formik}
                                    placeholder="Subject"
                                    inputBoxStyle={tw`h-[54px]`}
                                />

                                <FormInput
                                    name="message"
                                    formik={formik}
                                    placeholder="Your message"
                                    multiline
                                    textAlignVertical="top"
                                    inputBoxStyle={tw`min-h-[300px] h-auto p-4 items-start`}
                                    inputStyle={tw`h-full`}
                                />
                            </View>
                        </View>
                        <Button
                            onPress={() => formik.handleSubmit()}
                            style={tw`rounded-full w-full mt-6 h-[52px] flex-row items-center justify-center gap-2 shadow-sm`}
                        >
                            <Text style={tw`text-white font-semibold text-[16px]`}>
                                Send
                            </Text>
                            <Feather name="send" size={18} color="white" />
                        </Button>
                    </KeyboardAwareScrollView>
                )}
            </Formik>
        </SafeAreaView>
    );
};

export default SupportScreen;
