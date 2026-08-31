import NavHeading from "@/components/common/account/nav-heading";
import { Box, Heading } from "@/components/ui";
import tw from "@/components/ui/tailwind";
import FavIcon from "@/icon/favIcon";
import React from "react";
import {
    StatusBar,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



const PrivacyPolicy = () => {


    return (
        <SafeAreaView style={[tw`flex-1`]}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />
            <NavHeading title="Privacy policy" />


            <Box style={tw`items-center size-18 mx-auto rounded-full justify-center bg-white my-6`}>
                <FavIcon width={40} height={40} name="aboutus" />
            </Box>
            <View style={tw`px-5 gap-6`} >
                <Heading variant="p" style={tw`text-gray-600`}>Lorem ipsum dolor sit amet consectetur. Blandit elementum eu nisi sed turpis pellentesque sagittis. Risus consequat orci risus risus tincidunt eget nunc aliquam. Et phasellus nisl donec eget erat tincidunt sem. Vitae et morbi amet tempus eleifend consectetur cursus quam enim. </Heading>
                <Heading variant="p" style={tw`text-gray-600`}>Ipsum mi ipsum volutpat euismod nisl ut vestibulum maecenas. Odio amet etiam non tristique. Mi odio tristique tortor etiam posuere. Enim fermentum consequat consectetur magna non enim feugiat. Sit faucibus congue dolor mauris lectus. Netus adipiscing quis eros nulla ultrices porttitor nisl amet. Habitant id id elit erat duis elementum a integer.</Heading>
            </View>


        </SafeAreaView>
    );
};

export default PrivacyPolicy 
