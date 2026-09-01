import {
  RecipeFormContainer,
  RecipeFormValues,
} from "@/components/common/creator/recipe-store";
import { defaultRecipeDetails, popularRecipes } from "@/components/data";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";

const RecipeEdit = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  // Fetch or find recipe by id, or use pre-populated demo data matching Figma design
  const initialEditValues: RecipeFormValues = useMemo(() => {
    const found = popularRecipes.find((r) => r.id === id);

    const mainImg =
      found?.image ||
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop";

    const galleryImgs = found?.images && found.images.length >= 4
      ? found.images.slice(0, 4)
      : [
          "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=300&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=300&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=300&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=300&auto=format&fit=crop",
        ];

    const ings = found?.ingredients || [
      "2 packs fresh or dried ramen noodles.",
      "8 to 10 medium shrimp, peeled and deveined.",
      "2 large eggs",
      "1 cup snow peas or sugar snap peas",
    ];

    const instrs = [
      {
        id: "step-1",
        title:
          "Lorem ipsum dolor sit amet consectetur. Orci non cras sed vestibulum aenean nunc pulvinar semper.",
        description:
          "Lorem ipsum dolor sit amet consectetur. Orci non cras sed vestibulum aenean nunc pulvinar semper. Quam tortor tortor egestas curabitur eu commodo pro neque condimentum. Sed elit elementum quis etiam. Gravida rhinonerus auctor. Nisl vitae sit imperdiet.",
        image:
          "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "step-2",
        title:
          "Lorem ipsum dolor sit amet consectetur. Orci non cras sed vestibulum aenean nunc pulvinar semper.",
        description:
          "Lorem ipsum dolor sit amet consectetur. Orci non cras sed vestibulum aenean nunc pulvinar semper. Quam tortor tortor egestas curabitur eu commodo pro neque condimentum. Sed elit elementum quis etiam. Gravida rhinonerus auctor. Nisl vitae sit imperdiet.",
      },
    ];

    return {
      name: found?.title || "Shrimp Ramen Bowl",
      description:
        found?.description ||
        defaultRecipeDetails.description ||
        "Lorem ipsum dolor sit amet consectetur. Rutrum vitae tortor ut at turpis id quisque lacus. Cras bibendum amet ipsum et pellentesque congue elementum risus rhoncus.",
      category: found?.category || "Ramen",
      cookingTime: found?.cookingTime || "20 minutes",
      servings: found?.servings || "4 persons",
      cuisine: found?.cuisine || "Japanese",
      mainImage: mainImg,
      galleryImages: galleryImgs,
      ingredients: ings,
      instructions: instrs,
    };
  }, [id]);

  const handleUpdateRecipe = (values: RecipeFormValues) => {
    console.log("Updating Recipe Details:", values);
    // In a real app or API integration, update recipe in backend/store here
    router.back();
  };

  return (
    <RecipeFormContainer
      mode="edit"
      headerTitle="Edit recipe details"
      submitButtonLabel="Save changes"
      initialValues={initialEditValues}
      onSubmit={handleUpdateRecipe}
    />
  );
};

export default RecipeEdit;
