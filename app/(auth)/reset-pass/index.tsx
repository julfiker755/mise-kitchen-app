import { assets } from "@/assets";
import { getInit } from "@/components/lib";
import { change_sc } from "@/components/schema";
import { BackBtn, FormInput } from "@/components/ui";
import tw from "@/components/ui/tailwind";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Image,
  Modal,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResetPassword() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (values: any, { resetForm }: any) => {
    console.log("Reset Password Attempt:", values);
    resetForm();
    setIsSuccess(true);
  };

  const handleSuccessClose = () => {
    setIsSuccess(false);
    router.replace("/(auth)/login");
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
            Reset Password
          </Text>
          <Text
            style={tw`text-[13.5px] text-[#7A7A7A] text-center max-w-[280px] leading-5`}
          >
            Enter a new password for your account.
          </Text>
        </View>

        <Formik
          initialValues={getInit(change_sc)}
          validationSchema={change_sc}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <View style={tw`w-full`}>
              <FormInput
                name="password"
                formik={formik}
                label="Password"
                placeholder="Enter new password"
                secure
                containerStyle={tw`mb-4`}
              />

              <FormInput
                name="c_password"
                formik={formik}
                label="Confirm password"
                placeholder="Enter the password again"
                secure
                containerStyle={tw`mb-6`}
              />

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
          )}
        </Formik>

        {/* ============= Success Modal ========== */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isSuccess}
          onRequestClose={handleSuccessClose}
        >
          <View style={tw`flex-1 justify-center items-center bg-black/50 p-6`}>
            <View
              style={tw`bg-white p-6 rounded-3xl w-full max-w-sm items-center shadow-xl`}
            >
              <View
                style={tw`w-16 h-16 rounded-full bg-[#EBF3E8] justify-center items-center mb-4`}
              >
                <Feather name="check" size={32} color="#5B7553" />
              </View>

              <Text style={tw`text-[20px] font-bold text-[#1E2022] mb-2`}>
                Password Reset!
              </Text>

              <Text style={tw`text-[14px] text-[#7A7A7A] text-center mb-6 leading-5`}>
                Your password has been changed successfully. You can now login with your new password.
              </Text>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleSuccessClose}
                style={tw`w-full bg-primary rounded-full h-[48px] items-center justify-center`}
              >
                <Text style={tw`text-white font-semibold text-[15px]`}>
                  Back to login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
