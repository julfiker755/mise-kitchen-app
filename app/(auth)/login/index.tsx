import { assets } from "@/assets";
import { getInit } from "@/components/lib";
import { Login_sc } from "@/components/schema";
import { BackBtn, FormInput } from "@/components/ui";
import tw from "@/components/ui/tailwind";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (values: any, { resetForm }: any) => {
    console.log("Login Attempt:", values);
    router.push("/(tabs)/home");
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
        <View style={tw`items-center my-3`}>
          <Image
            source={assets.logo}
            style={{ width: 260, height: 120 }}
            resizeMode="contain"
          />
        </View>
        <View style={tw`items-center mb-6`}>
          <Text style={tw`text-[26px] font-bold text-[#1E2022] text-center mb-1.5`}>
            Welcome Back
          </Text>
          <Text
            style={tw`text-[13.5px] text-[#7A7A7A] text-center max-w-[280px] leading-5`}
          >
            Please provide your login credentials to enter your account.
          </Text>
        </View>
        <Formik
          initialValues={getInit(Login_sc)}
          validationSchema={Login_sc}
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
                containerStyle={tw`mb-4`}
              />

              <FormInput
                name="password"
                formik={formik}
                label="Password"
                placeholder="Enter your password"
                secure
                containerStyle={tw`mb-3`}
              />
              <View style={tw`flex-row justify-between items-center my-3`}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setRememberMe(!rememberMe)}
                  style={tw`flex-row items-center`}
                >
                  <Checkbox
                    value={rememberMe}
                    onValueChange={setRememberMe}
                    color={rememberMe ? "#5B7553" : undefined}
                    style={tw`w-4 h-4 rounded border border-[#CBD5E1]`}
                  />
                  <Text style={tw`text-[13.5px] text-[#4B5563] ml-2`}>
                    Remember me
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => router.push("/(auth)/forgot-pass")}
                >
                  <Text style={tw`text-[13.5px] font-medium text-primary`}>
                    Forgot Password ?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => formik.handleSubmit()}
                style={tw`bg-primary rounded-full h-[52px] flex-row items-center justify-center mt-3 shadow-sm`}
              >
                <Text style={tw`text-white font-semibold text-[16px] mr-2`}>
                  Login
                </Text>
                <Feather name="arrow-right" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View style={tw`flex-row justify-center items-center mt-6`}>
          <Text style={tw`text-[14px] text-[#4B5563]`}>
            Don&apos;t have an account ?{" "}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/(auth)/register")}
            style={tw`flex-row items-center`}
          >
            <Text style={tw`text-[14px] font-semibold text-primary mr-1`}>
              Register
            </Text>
            <Ionicons name="caret-forward" size={12} color="#5B7553" />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
