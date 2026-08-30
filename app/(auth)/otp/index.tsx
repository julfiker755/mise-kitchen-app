import { assets } from "@/assets";
import { otp_sc } from "@/components/schema";
import { BackBtn, FormInput } from "@/components/ui";
import tw from "@/components/ui/tailwind";
import { useLocalSearchParams, useRouter } from "expo-router";
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

export default function OtpScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const router = useRouter();

  const getMaskedEmail = () => {
    if (!email) return "ex******23@gmail.com";
    const parts = email.split("@");
    if (parts.length < 2) return email;
    const name = parts[0];
    const domain = parts[1];
    if (name.length <= 3) {
      return `${name[0]}******@${domain}`;
    }
    return `${name.slice(0, 2)}******${name.slice(-2)}@${domain}`;
  };

  const handleSubmit = (values: any) => {
    console.log("OTP Attempt:", values);
    router.push({
      pathname: "/(auth)/reset-pass",
      params: { otp: values.otp, email: email },
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
            Verify OTP
          </Text>
          <Text
            style={tw`text-[13.5px] text-[#7A7A7A] text-center max-w-[310px] leading-5`}
          >
            We have sent you a 6 digit OTP to {getMaskedEmail()}. Please enter the OTP here.
          </Text>
        </View>

        {/* Form */}
        <Formik
          initialValues={{ otp: "" }}
          validationSchema={otp_sc}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <View style={tw`w-full`}>
              <FormInput
                name="otp"
                formik={formik}
                placeholder="Enter OTP"
                keyboardType="numeric"
                maxLength={6}
                inputStyle={tw`text-center tracking-widest text-[16px]`}
                containerStyle={tw`mb-6`}
              />
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => formik.handleSubmit()}
                style={tw`bg-primary rounded-full h-[52px] items-center justify-center shadow-sm`}
              >
                <Text style={tw`text-white font-semibold text-[16px]`}>
                  Verify
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
