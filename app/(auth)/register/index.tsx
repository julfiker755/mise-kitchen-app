import { assets } from "@/assets";
import { getInit } from "@/components/lib";
import { register_sc } from "@/components/schema";
import { BackBtn, FormInput } from "@/components/ui";
import tw from "@/components/ui/tailwind";
import { Feather, Ionicons } from "@expo/vector-icons";
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

export default function Register() {
  const router = useRouter();

  const handleSubmit = (values: any, { resetForm }: any) => {
    console.log("Register Attempt:", values);
    router.push("/(auth)/login");
    resetForm();
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
        <View style={tw`items-center`}>
          <Image
            source={assets.logo}
            style={{ width: 260, height: 120 }}
            resizeMode="contain"
          />
        </View>

        <View style={tw`items-center mb-3`}>
          <Text style={tw`text-[26px] font-bold text-[#1E2022] text-center mb-1.5`}>
            Create an account
          </Text>
          <Text
            style={tw`text-[13.5px] text-[#7A7A7A] text-center max-w-[290px] leading-5`}
          >
            Please provide the information&apos;s below to create your account.
          </Text>
        </View>
        <Formik
          initialValues={getInit(register_sc)}
          validationSchema={register_sc}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <View style={tw`w-full`}>
              <FormInput
                name="name"
                formik={formik}
                label="Name"
                placeholder="Enter your full name"
                containerStyle={tw`mb-3.5`}
              />

              <FormInput
                name="email"
                formik={formik}
                label="Email"
                placeholder="Enter your email address"
                keyboardType="email-address"
                autoCapitalize="none"
                containerStyle={tw`mb-3.5`}
              />

              <FormInput
                name="password"
                formik={formik}
                label="Password"
                placeholder="Enter a password"
                secure
                containerStyle={tw`mb-3.5`}
              />

              <FormInput
                name="c_password"
                formik={formik}
                label="Confirm Password"
                placeholder="Enter the password again"
                secure
                containerStyle={tw`mb-5`}
              />
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => formik.handleSubmit()}
                style={tw`bg-primary rounded-full h-[52px] flex-row items-center justify-center shadow-sm`}
              >
                <Text style={tw`text-white font-semibold text-[16px] mr-2`}>
                  Register
                </Text>
                <Feather name="arrow-right" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <View style={tw`flex-row justify-center items-center mt-6`}>
          <Text style={tw`text-[14px] text-[#4B5563]`}>
            Already have an account ?{" "}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/(auth)/login")}
            style={tw`flex-row items-center`}
          >
            <Text style={tw`text-[14px] font-semibold text-primary mr-1`}>
              Login
            </Text>
            <Ionicons name="caret-forward" size={12} color="#5B7553" />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
