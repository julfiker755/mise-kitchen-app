import tw from "@/components/ui/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { FormikProps } from "formik";
import React, { useRef, useState } from "react";
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

type FormValues = Record<string, any>;

interface FormInputProps<T extends FormValues> extends TextInputProps {
  name: keyof T & string;
  formik: FormikProps<T>;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  secure?: boolean;
  containerStyle?: any;
  inputBoxStyle?: any;
  inputStyle?: any;
}

export const FormInput = <T extends FormValues>({
  name,
  formik,
  label,
  placeholder,
  icon,
  secure,
  containerStyle,
  inputBoxStyle,
  inputStyle,
  ...props
}: FormInputProps<T>) => {
  const [show, setShow] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const { values, errors, touched, handleChange, handleBlur } = formik;
  const hasError = Boolean(touched[name] && errors[name]);
  const error = hasError ? String(errors[name]) : undefined;

  return (
    <View style={[tw`w-full`, containerStyle]}>
      {label && (
        <Text style={tw`text-[14px] font-semibold text-[#1E2022] mb-1.5`}>
          {label}
        </Text>
      )}

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => inputRef.current?.focus()}
        style={[
          tw`bg-white rounded-2xl h-[52px] px-4 flex-row items-center border ${
            hasError ? "border-red-400" : "border-transparent"
          }`,
          inputBoxStyle,
        ]}
      >
        {icon && <View style={tw`mr-2.5`}>{icon}</View>}

        <TextInput
          ref={inputRef}
          value={String(values[name] ?? "")}
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
          placeholder={placeholder}
          placeholderTextColor="#A0A0A0"
          secureTextEntry={secure && !show}
          style={[tw`flex-1 text-[#1E2022] text-[15px] h-full`, inputStyle]}
          {...props}
        />

        {secure && (
          <TouchableOpacity
            onPress={() => setShow(!show)}
            activeOpacity={0.7}
            style={tw`p-1`}
          >
            <Ionicons
              name={show ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#71717A"
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      {error && (
        <Text style={tw`text-red-500 text-xs mt-1 ml-1`}>
          {error}
        </Text>
      )}
    </View>
  );
};
