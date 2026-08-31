import tw from "@/components/ui/tailwind";
import { window } from "@/utils";
import { memo } from "react";
import { Text, View } from "react-native";

const SCREEN_WIDTH = window.width;

// Weekly chart data matching the screenshot
const WEEK_DATA = [
    { day: "Sat", value: 6.8 },
    { day: "Sun", value: 9.8 },
    { day: "Mon", value: 3.8 },
    { day: "Tue", value: 11.8 },
    { day: "Wen", value: 6.8 },
    { day: "Thu", value: 5.8 },
    { day: "Fri", value: 10.8 },
];

const Y_AXIS_TICKS = [12, 10, 8, 6, 4, 2, 0];
const MAX_VALUE = 12;
const CHART_HEIGHT = 220;


const ViewsPreferencesChart = memo(() => (
    <View style={tw`mb-7`}>
        <Text style={tw`text-[#1E293B] text-[18px] font-bold mb-4`}>
            Views preferences
        </Text>

        {/* Chart Container */}
        <View style={{ height: CHART_HEIGHT, width: "100%" }}>
            {/* Y Axis Labels and Horizontal Grid Lines */}
            {Y_AXIS_TICKS.map((tick) => {
                const topPosition = (1 - tick / MAX_VALUE) * (CHART_HEIGHT - 28);
                return (
                    <View
                        key={tick}
                        style={{
                            position: "absolute",
                            top: topPosition,
                            left: 0,
                            right: 0,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                width: 22,
                                fontSize: 12,
                                color: "#9CA3AF",
                                textAlign: "left",
                            }}
                        >
                            {tick}
                        </Text>
                        <View
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: "#ECE8DF",
                                marginLeft: 6,
                            }}
                        />
                    </View>
                );
            })}

            {/* Bars and X-Axis Labels */}
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 32,
                    right: 8,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    paddingBottom: 4,
                }}
            >
                {WEEK_DATA.map((item, index) => {
                    const barHeight = (item.value / MAX_VALUE) * (CHART_HEIGHT - 32);
                    return (
                        <View
                            key={index}
                            style={{
                                alignItems: "center",
                                justifyContent: "flex-end",
                                height: CHART_HEIGHT - 4,
                            }}
                        >
                            {/* Rounded Bar */}
                            <View
                                style={{
                                    width: (SCREEN_WIDTH - 100) / 7 - 10,
                                    maxWidth: 22,
                                    minWidth: 16,
                                    height: Math.max(barHeight, 8),
                                    backgroundColor: "#5B7553",
                                    borderRadius: 9999,
                                    marginBottom: 8,
                                }}
                            />
                            {/* Day Label */}
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: "#7E847B",
                                    fontWeight: "500",
                                }}
                            >
                                {item.day}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </View>
    </View>
));

ViewsPreferencesChart.displayName = "ViewsPreferencesChart";

export default ViewsPreferencesChart;