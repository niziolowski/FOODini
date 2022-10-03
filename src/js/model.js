import { AJAX, calcDaysLeft } from "./helpers.js";
import { API_URL_STORAGE, API_URL_RECIPES } from "./config.js";
// § STATE

export const state = {
  colorTheme: [
    { property: "--bg-color", value: "#f5f5f5" },
    { property: "--accent-color", value: "#516e94" },
    { property: "--font-color", value: "#333333" },
    { property: "--tag-1-color", value: "#ffe047" },
    { property: "--tag-2-color", value: "#7ab4ff" },
    { property: "--tag-3-color", value: "#dd6b6b" },
  ],
  tags: {
    storage: ["świeże", "suche", "mrożone"],
    recipes: ["śniadanie", "obiad", "kolacja"],
  },
  recipes: [],
  storage: [],
};

// TEST DATA
const storage = [
  {
    id: 1,
    created_at: 1660643417457,
    name: "Jajka",
    amount: 10,
    unit: "szt.",
    expiry: 14,
    bookmark: true,
    group: "świeże",
  },
  {
    id: 30,
    created_at: 1664793332235,
    name: "Makaron",
    amount: 100,
    unit: "g",
    expiry: 60,
    bookmark: false,
    group: "suche",
  },
  {
    id: 31,
    created_at: 1664793363681,
    name: "Pomidor",
    amount: 2,
    unit: "szt.",
    expiry: 7,
    bookmark: false,
    group: "świeże",
  },
  {
    id: 32,
    created_at: 1664793386948,
    name: "Parmezan",
    amount: 50,
    unit: "g",
    expiry: 30,
    bookmark: false,
    group: "świeże",
  },
];

const recipes = [
  {
    id: 1,
    created_at: 1661700093430,
    name: "Jajecznica",
    group: "śniadanie",
    difficulty: 1,
    ingredients: [{ name: "Jajka", unit: "szt.", amount: 4 }],
    spices: ["sól", "pieprz"],
    bookmark: false,
    image_url:
      "https://cdn.galleries.smcloud.net/t/photos/gf-bc5p-Ttbo-1SJC_jajecznica-podstawowy-przepis-na-klasyczna-potrawe-z-rozmaconych-jajek.jpg",
    description: "Normalnie, jajka rozbić na patelnii i smażyć aż się zetno.",
  },
  {
    id: 2,
    created_at: 1664716054736,
    name: "Makaron z sosem pomidorowy i parmezanem",
    group: "obiad",
    difficulty: 2,
    ingredients: [
      { name: "Makaron", unit: "g", amount: 50 },
      { name: "Pomidor", unit: "szt.", amount: 3 },
    ],
    spices: ["sól", "pieprz", "bazylia"],
    bookmark: true,
    image_url:
      "https://cdn.galleries.smcloud.net/t/photos/gf-Yz2K-uho6-f6NT_spaghetti-bolognese-przepis-na-wloskie-danie-dla-4-osob.jpg",
    description:
      "Makaron gotujemy al dente. Obieramy cebulę i kroimy w kosteczkę, ząbki czosnku drobno siekamy. Parmezan ścieramy na drobniutkich oczkach. \n\n\n      Rozgrzewamy oliwę na głębokiej patelni i podsmażamy do zeszklenia cebulę i czosnek. Na patelnię dodajemy pomidory z puszki (z całą zalewą), łyżeczkę koncentratu i przyprawy.\n      \n      Ugotowany makaron wrzucamy na patelnię z sosem, mieszamy i gotujemy około 1-2 minut.\n      Dodajemy pokrojoną na mniejsze kawałki bazylię, 1 łyżkę startego parmezanu i mieszamy.\n      \n      Podajemy na talerzach posypane resztą parmezanu i przyozdobione świeżymi listkami bazylii.",
  },
];

storage.forEach((ing) =>
  state.storage.push(
    new Ingredient(
      ing.id,
      ing.name,
      ing.amount,
      ing.unit,
      ing.group,
      ing.bookmark,
      ing.created_at,
      ing.expiry
    )
  )
);

recipes.forEach((rec) =>
  state.recipes.push(
    new Recipe(
      rec.id,
      rec.name,
      rec.group,
      rec.description,
      rec.ingredients,
      rec.spices,
      rec.difficulty,
      rec.bookmark,
      rec.image_url
    )
  )
);

import { Ingredient } from "./features/Ingredient.js";
import { Recipe } from "./features/Recipe.js";

export async function loadStorage() {
  try {
    const data = await AJAX(API_URL_STORAGE);
    data.forEach((ing) => {
      // const ingredient = {
      //   id: ing.id,
      //   name: ing.name,
      //   amount: ing.amount,
      //   unit: ing.unit,
      //   group: ing.group,
      //   bookmark: ing.bookmark,
      //   createdAt: ing.created_at,
      //   expiry: ing.expiry,
      //   daysLeft:
      //     ing.expiry - calcDaysLeft(ing.created_at, new Date().getTime()),
      // };

      state.storage.push(
        new Ingredient(
          ing.id,
          ing.name,
          ing.amount,
          ing.unit,
          ing.group,
          ing.bookmark,
          ing.created_at,
          ing.expiry
        )
      );
    });
  } catch (error) {
    throw error;
  }
}

export async function loadRecipes() {
  try {
    const data = await AJAX(API_URL_RECIPES);
    data.forEach((rec) => {
      // const recipe = {
      //   id: rec.id,
      //   title: rec.name,
      //   group: rec.group,
      //   description: rec.description,
      //   ingredients: rec.ingredient,
      //   spices: rec.spices,
      //   difficulty: rec.difficulty,
      //   bookmark: rec.bookmark,
      //   imageURL: rec.image_url,
      // };
      state.recipes.push(
        new Recipe(
          rec.id,
          rec.name,
          rec.group,
          rec.description,
          rec.ingredients,
          rec.spices,
          rec.difficulty,
          rec.bookmark,
          rec.image_url
        )
      );
    });
  } catch (error) {
    throw error;
  }
}

export async function loadState() {
  try {
    await loadStorage();
    await loadRecipes();
    console.log(`LOADED STATE FROM API:`);
    console.log(state);
  } catch (error) {
    throw error;
  }
}
