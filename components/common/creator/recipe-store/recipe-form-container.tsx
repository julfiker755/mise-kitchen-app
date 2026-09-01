import { recipe_sc } from "@/components/schema";
import { BackBtn, FormInput } from "@/components/ui";
import tw from "@/components/ui/tailwind";
import { Insets } from "@/utils";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Formik, FormikProps } from "formik";
import React, { useState } from "react";
import {
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecipeImagePicker } from "./recipe-image-picker";
import { RecipeIngredientsManager } from "./recipe-ingredients-manager";
import {
  InstructionStep,
  RecipeInstructionCard,
} from "./recipe-instruction-card";
import { RecipeSelectModal } from "./recipe-select-modal";
import { RecipeSelectTrigger } from "./recipe-select-trigger";
import { RecipeStepModal } from "./recipe-step-modal";

export interface RecipeFormValues {
  name: string;
  description: string;
  category: string;
  cookingTime: string;
  servings: string;
  cuisine: string;
  mainImage: string;
  galleryImages: string[];
  ingredients: string[];
  instructions: InstructionStep[];
}

interface RecipeFormContainerProps {
  mode: "add" | "edit";
  initialValues: RecipeFormValues;
  headerTitle: string;
  submitButtonLabel: string;
  onSubmit: (values: RecipeFormValues) => void;
}

const CATEGORY_OPTIONS = [
  "Burger",
  "Pizza",
  "Ramen",
  "Pasta",
  "Biriyani",
  "Chicken",
  "Salad",
];

const SERVINGS_OPTIONS = [
  "1 person",
  "2 persons",
  "3 persons",
  "4 persons",
  "5 persons",
  "6 persons",
];

const CUISINE_OPTIONS = [
  "Italian",
  "American",
  "Asian",
  "Japanese",
  "Chinese",
];

export const RecipeFormContainer: React.FC<RecipeFormContainerProps> = ({
  mode,
  initialValues,
  headerTitle,
  submitButtonLabel,
  onSubmit,
}) => {
  const bottomInset = Insets.useBottom(16, 8);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [servingsModalVisible, setServingsModalVisible] = useState(false);
  const [cuisineModalVisible, setCuisineModalVisible] = useState(false);
  const [stepModalVisible, setStepModalVisible] = useState(false);
  const [editingStepIndex, setEditingStepIndex] = useState<number | null>(null);

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: "#FAF7F2" }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />

      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-5 pt-2 pb-3`}>
        <BackBtn style={tw`my-0`} />
        <Text style={tw`text-[18px] font-bold text-[#1E2022] text-center`}>
          {headerTitle}
        </Text>
        <View style={tw`w-10`} />
      </View>

      <Formik
        initialValues={initialValues}
        validationSchema={recipe_sc}
        enableReinitialize
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {(formik: FormikProps<RecipeFormValues>) => {
          const { values, errors, touched, setFieldValue, handleSubmit } = formik;

          const handleAddStep = (step: InstructionStep) => {
            if (editingStepIndex !== null) {
              const updated = [...values.instructions];
              updated[editingStepIndex] = step;
              setFieldValue("instructions", updated);
            } else {
              setFieldValue("instructions", [...values.instructions, step]);
            }
            setEditingStepIndex(null);
          };

          const handleDeleteStep = (index: number) => {
            const updated = values.instructions.filter((_, i) => i !== index);
            setFieldValue("instructions", updated);
          };

          const currentEditingStep =
            editingStepIndex !== null
              ? values.instructions[editingStepIndex]
              : null;

          return (
            <View style={tw`flex-1 justify-between`}>
              <KeyboardAwareScrollView
                bottomOffset={80}
                contentContainerStyle={tw`px-5 pt-2 pb-32`}
                showsVerticalScrollIndicator={false}
              >
                <RecipeImagePicker
                  mainImage={values.mainImage}
                  galleryImages={values.galleryImages}
                  onMainImageChange={(uri) => setFieldValue("mainImage", uri)}
                  onGalleryImageChange={(index, uri) => {
                    const gallery = [...(values.galleryImages || ["", "", "", ""])];
                    gallery[index] = uri;
                    setFieldValue("galleryImages", gallery);
                  }}
                  onRemoveGalleryImage={(index) => {
                    const gallery = [...(values.galleryImages || ["", "", "", ""])];
                    gallery[index] = "";
                    setFieldValue("galleryImages", gallery);
                  }}
                  error={
                    touched.mainImage && errors.mainImage
                      ? String(errors.mainImage)
                      : undefined
                  }
                />

                {/* 2. Recipe Name */}
                <FormInput
                  name="name"
                  formik={formik}
                  label="Name"
                  placeholder="Enter your recipe name"
                  containerStyle={tw`mb-3.5`}
                />
                <FormInput
                  label="Description"
                  name="description"
                  formik={formik}
                  placeholder="Write something about your recipe"
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  containerStyle={tw`w-full`}
                  inputBoxStyle={tw`bg-transparent h-auto p-0 border-0`}
                  inputStyle={tw`text-[#1E2022] bg-white rounded-md text-[15px] min-h-[100px] leading-5`}
                />
                <RecipeSelectTrigger
                  label="Category"
                  value={values.category}
                  placeholder="Select your recipe category"
                  onPress={() => setCategoryModalVisible(true)}
                  error={
                    touched.category && errors.category
                      ? String(errors.category)
                      : undefined
                  }
                />
                <FormInput
                  name="cookingTime"
                  formik={formik}
                  label="Cooking time"
                  placeholder="Enter your cooking time"
                  icon={<Feather name="clock" size={19} color="#71717A" />}
                  containerStyle={tw`mb-3.5`}
                />
                <RecipeSelectTrigger
                  label="Servings"
                  value={values.servings}
                  placeholder="Select recipe servings"
                  icon={<Feather name="users" size={19} color="#71717A" />}
                  onPress={() => setServingsModalVisible(true)}
                  error={
                    touched.servings && errors.servings
                      ? String(errors.servings)
                      : undefined
                  }
                />

                <RecipeSelectTrigger
                  label="Cuisine"
                  value={values.cuisine}
                  placeholder="Select recipe cuisine"
                  icon={
                    <MaterialCommunityIcons
                      name="noodles"
                      size={20}
                      color="#71717A"
                    />
                  }
                  onPress={() => setCuisineModalVisible(true)}
                  error={
                    touched.cuisine && errors.cuisine
                      ? String(errors.cuisine)
                      : undefined
                  }
                />
                <RecipeIngredientsManager
                  ingredients={values.ingredients || []}
                  onChange={(items) => setFieldValue("ingredients", items)}
                  error={
                    touched.ingredients && errors.ingredients
                      ? String(errors.ingredients)
                      : undefined
                  }
                />

                <View style={tw`w-full mb-6`}>
                  <Text
                    style={tw`text-[14px] font-semibold text-[#1E2022] mb-3`}
                  >
                    Instructions
                  </Text>

                  {/* List of step cards */}
                  {values.instructions && values.instructions.length > 0 ? (
                    <View style={tw`mb-3`}>
                      {values.instructions.map((step, idx) => (
                        <RecipeInstructionCard
                          key={step.id || `step-${idx}`}
                          step={step}
                          stepNumber={idx + 1}
                          onEdit={() => {
                            setEditingStepIndex(idx);
                            setStepModalVisible(true);
                          }}
                          onDelete={() => handleDeleteStep(idx)}
                        />
                      ))}
                    </View>
                  ) : null}

                  {/* Add New Step Trigger Button */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      setEditingStepIndex(null);
                      setStepModalVisible(true);
                    }}
                    style={tw`w-full bg-[#EAE6DD]/70 border border-[#E0DBD0] rounded-2xl py-4 flex-row items-center justify-center gap-2`}
                  >
                    <Ionicons name="add" size={20} color="#5B7553" />
                    <Text
                      style={tw`text-[15px] font-semibold text-[#1E2022]`}
                    >
                      Add new step
                    </Text>
                  </TouchableOpacity>

                  {touched.instructions && errors.instructions ? (
                    <Text style={tw`text-red-500 text-xs mt-1.5 ml-1`}>
                      {String(errors.instructions)}
                    </Text>
                  ) : null}
                </View>
              </KeyboardAwareScrollView>

              {/* Floating / Pinned Bottom Action Button */}
              <View
                style={[
                  tw`absolute bottom-0 left-0 right-0 bg-[#FAF7F2]/95 px-5 pt-3 border-t border-[#EBE6DC] shadow-lg`,
                  { paddingBottom: bottomInset },
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={() => handleSubmit()}
                  style={tw`bg-primary w-full h-[52px] rounded-full flex-row items-center justify-center shadow-md`}
                >
                  <Text style={tw`text-white font-bold text-[16px]`}>
                    {submitButtonLabel}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Category Dropdown Modal */}
              <RecipeSelectModal
                visible={categoryModalVisible}
                title="Select Category"
                options={CATEGORY_OPTIONS}
                selectedValue={values.category}
                onSelect={(val) => setFieldValue("category", val)}
                onClose={() => setCategoryModalVisible(false)}
              />

              {/* Servings Dropdown Modal */}
              <RecipeSelectModal
                visible={servingsModalVisible}
                title="Select Servings"
                options={SERVINGS_OPTIONS}
                selectedValue={values.servings}
                onSelect={(val) => setFieldValue("servings", val)}
                onClose={() => setServingsModalVisible(false)}
              />

              {/* Cuisine Dropdown Modal */}
              <RecipeSelectModal
                visible={cuisineModalVisible}
                title="Select Cuisine"
                options={CUISINE_OPTIONS}
                selectedValue={values.cuisine}
                onSelect={(val) => setFieldValue("cuisine", val)}
                onClose={() => setCuisineModalVisible(false)}
              />

              {/* Add / Edit Step Modal */}
              <RecipeStepModal
                visible={stepModalVisible}
                initialData={currentEditingStep}
                onSave={handleAddStep}
                onClose={() => {
                  setStepModalVisible(false);
                  setEditingStepIndex(null);
                }}
              />
            </View>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};
