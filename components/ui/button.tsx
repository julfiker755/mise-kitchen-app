import React, { memo } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import tw from "./tailwind";

// Define variant styles
const variants = {
  default: tw`bg-primary`,
  destructive: tw`bg-red-600`,
  success: tw`bg-[#218838]`,
  secondary: tw`bg-[#D9D9D9]`,
  link: tw`bg-transparent`,
};

const textColors = {
  default: tw`text-white`,
  destructive: tw`text-white`,
  success: tw`text-white`,
  secondary: tw`text-black`,
  link: tw`text-[#3D3D3D]`,
};

// Define size styles
const sizes = {
  default: tw`h-10 px-4`,
  sm: tw`h-8 px-3`,
  lg: tw`h-12 px-6`,
  icon: tw`h-10 w-10 p-2 rounded-full`,
  "icon-sm": tw`h-8 w-8 p-1.5`,
  "icon-lg": tw`h-12 w-12 p-3`,
};

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  style?: any;
  textStyle?: any;
  children?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  label?: string;
  activeOpacity?: number
}

const ButtonComponent: React.FC<ButtonProps> = ({
  variant = "default",
  size = "default",
  style,
  textStyle,
  children,
  onPress,
  disabled = false,
  isLoading = false,
  label,
  activeOpacity = 0.8
}) => {
  const isButtonDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isButtonDisabled}
      activeOpacity={activeOpacity}
      style={[
        tw`flex-row items-center justify-center rounded-md`,
        variants[variant],
        sizes[size],
        isButtonDisabled && tw`opacity-50`,
        style,
      ]}
    >
      {isLoading && <ActivityIndicator color="#fff" style={tw`mr-2`} />}
      {label ? (
        <Text
          style={[tw`font-medium text-white`, textColors[variant], textStyle]}
        >
          {label}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export const Button = memo(ButtonComponent);
