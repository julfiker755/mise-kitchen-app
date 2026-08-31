import React from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';


interface CalculationHeadingProps {
    data: { label: string; value: any }[];
    containerStyle?: any;
}

const CalculationHeading = ({ data = [], containerStyle }: CalculationHeadingProps) => {
    return (
        <View
            style={[
                tw`py-5`,
                containerStyle,
            ]}
        >
            <View style={tw`flex-row items-center justify-between pb-4`}>
                {data.map((item: any, index: any) => (
                    <React.Fragment key={index}>
                        <View style={[
                            tw`flex-1 items-center p-2 border-b border-[#ECE8DF]`,
                            index === 1 && tw`border-r border-l`,
                        ]}>
                            <Text
                                style={tw`text-[#8E938B] text-[13px] font-normal mb-1.5 text-center`}
                                numberOfLines={1}
                            >
                                {item.label}
                            </Text>
                            <Text style={tw`text-[#1E293B] text-[22px] font-bold`}>
                                {item.value}
                            </Text>
                        </View>
                    </React.Fragment>
                ))}
            </View>
        </View>
    );
};

export default CalculationHeading