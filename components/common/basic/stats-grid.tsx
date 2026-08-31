import tw from "@/components/ui/tailwind";
import React, { memo } from "react";
import { Text, View } from "react-native";

type StatItem = {
    label: string;
    value: string | number;
    icon?: any;
};

type StatsGridProps = {
    stats: StatItem[];
    columns?: number;
    cardStyle?: any;
    itemStyle?: any;
    labelStyle?: any;
    valueStyle?: any;
    iconWrapperStyle?: any;
};

const StatsGrid = memo(
    ({
        stats,
        columns = 2,
        cardStyle,
        itemStyle,
        labelStyle,
        valueStyle,
        iconWrapperStyle,
    }: StatsGridProps) => {
        const rows: StatItem[][] = [];
        for (let i = 0; i < stats.length; i += columns) {
            rows.push(stats.slice(i, i + columns));
        }

        return (
            <View
                style={tw`bg-[#FAF7F2] rounded-2xl border border-[#E9E5DC] mb-7 overflow-hidden`}
            >
                {rows.map((row, rowIndex) => (
                    <View
                        key={rowIndex}
                        style={tw`flex-row ${rowIndex !== rows.length - 1 ? "border-b border-[#E9E5DC]" : ""
                            }`}
                    >
                        {row.map((item, colIndex) => {
                            const hasIcon = !!item.icon;
                            return (
                                <View
                                    key={colIndex}
                                    style={[
                                        tw`flex-1 py-4.5 px-4 ${colIndex !== row.length - 1
                                            ? "border-r border-[#E9E5DC]"
                                            : ""
                                            }`,

                                        hasIcon
                                            ? tw`flex-row items-center justify-start`
                                            : tw`items-center justify-center`,
                                        cardStyle,
                                        itemStyle,
                                    ]}
                                >
                                    {hasIcon && (
                                        <View
                                            style={[
                                                tw`size-9 rounded-full bg-white items-center justify-center mr-2.5 shadow-xs`,
                                                iconWrapperStyle,
                                            ]}
                                        >
                                            {item.icon}
                                        </View>
                                    )}

                                    <View style={hasIcon ? tw`items-start` : tw`items-center`}>
                                        <Text
                                            style={[
                                                tw`text-[#7E847B] text-[13px] font-normal`,
                                                labelStyle,
                                            ]}
                                        >
                                            {item.label}
                                        </Text>
                                        <Text
                                            style={[
                                                tw`text-[#1E293B] text-[22px] font-bold mt-1`,
                                                valueStyle,
                                            ]}
                                        >
                                            {item.value}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                ))}
            </View>
        );
    }
);

StatsGrid.displayName = "StatsGrid";

export default StatsGrid;