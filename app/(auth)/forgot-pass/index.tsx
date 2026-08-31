import { assets } from "@/assets";
import { email_sc } from "@/components/schema";
import { BackBtn, FormInput } from "@/components/ui";
import tw from "@/components/ui/tailwind";
import { getInit } from "@/utils";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPassword() {
  const router = useRouter();

  const handleSubmit = (values: any) => {
    console.log("Forgot Password Attempt:", values);
    router.push({
      pathname: "/(auth)/otp",
      params: { email: values.email },
    });
  };

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: "#FAF7F2" }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
      <KeyboardAwareScrollView
        bottomOffset={20}
        contentContainerStyle={tw`flex-grow px-6 pb-8`}
        showsVerticalScrollIndicator={false}
      >
        <BackBtn />
        <View style={tw`items-center my-3`}>
          <Image
            source={assets.logo}
            style={{ width: 260, height: 120 }}
            resizeMode="contain"
          />
        </View>
        <View style={tw`items-center mb-6`}>
          <Text style={tw`text-[26px] font-bold text-[#1E2022] text-center mb-1.5`}>
            Forgot password ?
          </Text>
          <Text
            style={tw`text-[13.5px] text-[#7A7A7A] text-center max-w-[310px] leading-5`}
          >
            Enter the email address that you used to create your account. We will send an OTP to reset your password.
          </Text>
        </View>

        <Formik
          initialValues={getInit(email_sc)}
          validationSchema={email_sc}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <View style={tw`w-full`}>
              <FormInput
                name="email"
                formik={formik}
                label="Email"
                placeholder="Enter your email address"
                keyboardType="email-address"
                autoCapitalize="none"
                containerStyle={tw`mb-6`}
              />

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => formik.handleSubmit()}
                style={tw`bg-primary rounded-full h-[52px] items-center justify-center shadow-sm`}
              >
                <Text style={tw`text-white font-semibold text-[16px]`}>
                  Get OTP
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
