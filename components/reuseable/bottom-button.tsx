
import { Insets } from '@/utils';
import { Text, TouchableOpacity, View } from 'react-native';
import tw from '../ui/tailwind';




const BottomButton = ({ text, onPress }: {
    text: any
    onPress?: () => void
}) => {
    return (
        <View
            style={[
                tw`absolute bottom-0 left-0 right-0 bg-[#FAF7F2]/95 px-5 pt-3 border-t border-[#EBE6DC]`,
                { paddingBottom: Insets.useBottom(16, 8) },
            ]}
        >
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.9}
                style={tw`bg-primary w-full py-4 rounded-full items-center justify-center shadow-md`}
            >
                <Text style={tw`text-white font-bold text-base tracking-wide`}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default BottomButton;