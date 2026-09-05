import "@/utils/polyfill";
import { ConfirmDialogProvider } from "@/components/modal/confirm-dialog";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Toaster } from 'sonner-native';
import tw from "../components/ui/tailwind";

export const unstable_settings = {
  initialRouteName: "index",
};

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#2564eb07",
    card: "#2564eb07",
    primary: "#2564eb07",
    text: "#2564eb07",
  },
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider value={AppTheme}>
          <ConfirmDialogProvider>
            <SafeAreaView style={tw`flex-1 bg-background`}>
              <KeyboardProvider>
                {/* Status bar color */}
                <StatusBar
                  style="dark"
                  backgroundColor="#2564eb07"
                  translucent={false}
                />

                <Stack
                  screenOptions={{
                    headerShown: false,
                    contentStyle: {
                      backgroundColor: "#2564eb07",
                    },
                    statusBarStyle: "dark",
                    statusBarBackgroundColor: "#2564eb07",
                  }}
                >
                  <Stack.Screen name="index" />
                </Stack>
              </KeyboardProvider>
            </SafeAreaView>
          </ConfirmDialogProvider>
        </ThemeProvider>
        <Toaster />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
