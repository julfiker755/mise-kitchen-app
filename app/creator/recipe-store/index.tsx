import {
  RecipeFormContainer,
  RecipeFormValues,
} from "@/components/common/creator/recipe-store";
import { useRouter } from "expo-router";
import React from "react";

const initialAddValues: RecipeFormValues = {
  name: "",
  description: "",
  category: "",
  cookingTime: "",
  servings: "",
  cuisine: "",
  mainImage: "",
  galleryImages: ["", "", "", ""],
  ingredients: [],
  instructions: [],
};

const RecipeStore = () => {
  const router = useRouter();

  const handleAddRecipe = (values: RecipeFormValues) => {
    console.log("Adding New Recipe:", values);
    // In a real app or API integration, save recipe to backend/store here
    // router.back();
  };

  return (
    <RecipeFormContainer
      mode="add"
      headerTitle="Add new recipe"
      submitButtonLabel="Add"
      initialValues={initialAddValues}
      onSubmit={handleAddRecipe}
    />
  );
};

export default RecipeStore;
