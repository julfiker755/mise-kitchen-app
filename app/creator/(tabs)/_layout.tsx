import tw from "@/components/ui/tailwind";
import { tabIcon } from "@/icon/tab-icon";
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";

type TabRouteName = "index" | "recipes" | "account";

type IconSet = {
  active: string;
  inactive: string;
};

interface TabButtonProps {
  routeName: TabRouteName;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  accessibilityLabel?: string;
  testID?: string;
}

const recipesIcon = {
  inactive: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6F7470" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2v3M8 2.5v2.5M16 2.5v2.5"/>
    <path d="M3 11h18a1 1 0 0 1 1 1 9 9 0 0 1-9 9 9 9 0 0 1-9-9 1 1 0 0 1 1-1z"/>
  </svg>`,
  active: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B7553" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2v3M8 2.5v2.5M16 2.5v2.5"/>
    <path d="M3 11h18a1 1 0 0 1 1 1 9 9 0 0 1-9 9 9 9 0 0 1-9-9 1 1 0 0 1 1-1z" fill="#5B7553" fill-opacity="0.18"/>
  </svg>`,
};

const icons: Record<TabRouteName, IconSet> = {
  index: {
    active: tabIcon.home_active,
    inactive: tabIcon.home,
  },
  recipes: {
    active: recipesIcon.active,
    inactive: recipesIcon.inactive,
  },
  account: {
    active: tabIcon.account_active,
    inactive: tabIcon.account,
  },
};

const labels: Record<TabRouteName, string> = {
  index: "Home",
  recipes: "Recipes",
  account: "Account",
};

/* ============================================================
   Tab Button Component
============================================================ */

const TabButton = memo(
  ({
    routeName,
    isFocused,
    onPress,
    onLongPress,
    accessibilityLabel,
    testID,
  }: TabButtonProps) => {
    const iconSet = icons[routeName] || icons.index;
    const iconXml = isFocused ? iconSet.active : iconSet.inactive;
    const label = labels[routeName] || routeName;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
        onPress={onPress}
        onLongPress={onLongPress}
        style={tw`flex-1 items-center justify-center py-2`}
      >
        <View style={tw`items-center justify-center h-6 mb-1`}>
          <SvgXml xml={iconXml} width={22} height={22} />
        </View>
        <Text
          style={[
            tw`text-[11px]`,
            isFocused
              ? tw`text-primary font-bold`
              : tw`text-[#6F7470] font-medium`,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  },
);

TabButton.displayName = "TabButton";

/* ============================================================
   Custom Tab Bar
============================================================ */

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        tw`flex-row justify-around items-center bg-[#FAF7F2] border-t border-stone-200/70`,
        {
          paddingBottom: Math.max(insets.bottom, 10),
          paddingTop: 6,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const { options } = descriptors[route.key] as {
          options: BottomTabNavigationOptions;
        };

        const routeName = route.name as TabRouteName;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(routeName);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabButton
            key={route.key}
            routeName={routeName}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
          />
        );
      })}
    </View>
  );
};

/* ============================================================
   Creator Tabs Layout
============================================================ */

export default function CreatorTabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="recipes" options={{ title: "Recipes" }} />
      <Tabs.Screen name="account" options={{ title: "Account" }} />
    </Tabs>
  );
}
