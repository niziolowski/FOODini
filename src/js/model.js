import { AJAX, calcDaysLeft, formatDate } from "./helpers.js";
import {
  API_URL_STORAGE,
  API_URL_RECIPES,
  API_URL_CATALOG,
  API_URL_PLAN,
} from "./config.js";
import { Ingredient } from "./features/Ingredient.js";
import { Recipe } from "./features/Recipe.js";
import { Product } from "./features/Product.js";
import { Day } from "./features/Day.js";
import { Week } from "./features/Week.js";
import { Meal } from "./features/Meal.js";
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
  catalog: [],
  plan: {
    activeWeek: {},
    currentWeek: {},
    weeks: [],
  },
};

// TEST DATA
// const catalog = [
//   {
//     id: 1,
//     name: "Mąka",
//     amount: 1,
//     unit: "kg",
//     group: "suche",
//     bookmark: false,
//     expiry: 150,
//   },
//   {
//     id: 2,
//     name: "Jaja",
//     amount: 10,
//     unit: "szt.",
//     group: "świeże",
//     bookmark: false,
//     expiry: 14,
//   },
//   {
//     id: 11,
//     name: "Halibut",
//     amount: 300,
//     unit: "g",
//     group: "mrożone",
//     bookmark: false,
//     expiry: 150,
//   },
//   {
//     id: 12,
//     name: "Boczek",
//     amount: 400,
//     unit: "g",
//     group: "świeże",
//     bookmark: false,
//     expiry: 14,
//   },
//   {
//     id: 13,
//     name: "Jogurt naturalny",
//     amount: 1,
//     unit: "szt.",
//     group: "świeże",
//     bookmark: false,
//     expiry: 30,
//   },
//   {
//     id: 14,
//     name: "Makaron",
//     amount: 1,
//     unit: "szt.",
//     group: "suche",
//     bookmark: true,
//     expiry: 100,
//   },
//   {
//     id: 14,
//     name: "Przecier pomidorowy",
//     amount: 50,
//     unit: "g",
//     group: "świeże",
//     bookmark: true,
//     expiry: 15,
//   },
// ];

// const storage = [
//   {
//     id: 1,
//     created_at: 1660643417457,
//     name: "Jajka",
//     amount: 10,
//     unit: "szt.",
//     expiry: 14,
//     bookmark: true,
//     group: "świeże",
//   },
//   {
//     id: 999,
//     created_at: 1660643517457,
//     name: "Jajka",
//     amount: 1,
//     unit: "szt.",
//     expiry: 14,
//     bookmark: true,
//     group: "świeże",
//   },
//   {
//     id: 30,
//     created_at: 1664793332235,
//     name: "Makaron",
//     amount: 100,
//     unit: "g",
//     expiry: 60,
//     bookmark: false,
//     group: "suche",
//   },
//   {
//     id: 31,
//     created_at: 1664793363681,
//     name: "Pomidor",
//     amount: 2,
//     unit: "szt.",
//     expiry: 7,
//     bookmark: false,
//     group: "świeże",
//   },
//   {
//     id: 32,
//     created_at: 1664793386948,
//     name: "Parmezan",
//     amount: 50,
//     unit: "g",
//     expiry: 30,
//     bookmark: false,
//     group: "świeże",
//   },
//   {
//     id: 32,
//     created_at: 1664793386948,
//     name: "Grzyby suszone",
//     amount: 100,
//     unit: "g",
//     expiry: 200,
//     bookmark: false,
//     group: "świeże",
//   },
// ];

// const recipes = [
// {
//   id: 1,
//   created_at: 1661700093430,
//   name: "Jajecznica",
//   group: "śniadanie",
//   difficulty: 1,
//   ingredients: [
//     {
//       id: 1,
//       name: "Jajka",
//       amount: 4,
//       unit: "szt.",
//       group: "świeże",
//       bookmark: true,
//       purchaseDate: 1660643417457,
//       expiry: 14,
//       daysLeft: 0,
//     },
//     {
//       id: 1,
//       name: "Boczek",
//       amount: 50,
//       unit: "g",
//       group: "świeże",
//       bookmark: true,
//       purchaseDate: 1660643417457,
//       expiry: 14,
//       daysLeft: 0,
//     },
//   ],
//   spices: ["sól", "pieprz"],
//   bookmark: false,
//   image_url:
//     "https://cdn.galleries.smcloud.net/t/photos/gf-bc5p-Ttbo-1SJC_jajecznica-podstawowy-przepis-na-klasyczna-potrawe-z-rozmaconych-jajek.jpg",
//   description:
//     "Rozgrzać patelnię i podsmażyć boczek pokrojony w kostkę, dodać jajka i oprószyć delikatnie solą. Smażyć na małym ogniu, delikatnie przesuwając jajka drewnianą łyżką. Doprawić świeżo zmielonym czarnym pieprzem.",
// },
//   {
//     id: 2,
//     created_at: 1664716054736,
//     name: "Makaron z sosem pomidorowy i parmezanem",
//     group: "obiad",
//     difficulty: 2,
//     ingredients: [
//       { name: "Makaron", unit: "g", amount: 50 },
//       { name: "Pomidor", unit: "szt.", amount: 3 },
//     ],
//     spices: ["sól", "pieprz", "bazylia"],
//     bookmark: true,
//     image_url:
//       "https://cdn.galleries.smcloud.net/t/photos/gf-Yz2K-uho6-f6NT_spaghetti-bolognese-przepis-na-wloskie-danie-dla-4-osob.jpg",
//     description:
//       "Makaron gotujemy al dente. Obieramy cebulę i kroimy w kosteczkę, ząbki czosnku drobno siekamy. Parmezan ścieramy na drobniutkich oczkach. \n\n\n      Rozgrzewamy oliwę na głębokiej patelni i podsmażamy do zeszklenia cebulę i czosnek. Na patelnię dodajemy pomidory z puszki (z całą zalewą), łyżeczkę koncentratu i przyprawy.\n      \n      Ugotowany makaron wrzucamy na patelnię z sosem, mieszamy i gotujemy około 1-2 minut.\n      Dodajemy pokrojoną na mniejsze kawałki bazylię, 1 łyżkę startego parmezanu i mieszamy.\n      \n      Podajemy na talerzach posypane resztą parmezanu i przyozdobione świeżymi listkami bazylii.",
//   },
//   {
//     id: 3,
//     created_at: 1664716054736,
//     name: "Stek z pieprzem",
//     group: "obiad",
//     difficulty: 2,
//     ingredients: [
//       { name: "Stek wołowy", unit: "g", amount: 350 },
//       { name: "Masło klarowane", unit: "g", amount: 20 },
//     ],
//     spices: ["sól", "pieprz"],
//     bookmark: true,
//     image_url:
//       "https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/stek_z_pieprzem_1.jpg",
//     description: `Steki ogrzać do temperatury pokojowej. Osuszyć papierowym ręcznikiem, obtoczyć w pieprzu (nie solić). Rozgrzać grubą patelnię (np. żeliwną) na średnim ogniu. Wlać oliwę i gdy będzie gorąca włożyć steki. Smażyć na średnio dużym ogniu przez 4 - 5 minut, aż będą zrumienione i wysmażone mniej więcej do 1/3 wysokości. Przewrócić na drugą stronę i smażyć przez kolejne 4 - 5 minuty. Zdjąć z patelni, położyć na podgrzanym talerzu (talerz można podgrzać na parze kładąc go na garnku po gotujących się brokułach), mięso oprószyć odrobiną soli i przykryć folią aluminiową.
//       Na patelnię po stekach wlać brandy i łopatką zeskrobać to co pozostało na dnie, podgrzewać przez około pół minuty, aż płyn zredukuje się o połowę. Wlać sok ze steków (odstawione i przykryte steki puszczą odrobinę soku) oraz śmietankę. Gdy sos zgęstnieje odstawić patelnię z ognia, dodać musztardę dijon i przelać do miseczki. W razie konieczności doprawić odrobiną soli.`,
//   },
//   {
//     id: 4,
//     created_at: 1664716054736,
//     name: "Leczo wegetarianskie",
//     group: "obiad",
//     difficulty: 2,
//     ingredients: [
//       { name: "Cebula", unit: "szt.", amount: 1 },
//       { name: "Cukinia", unit: "szt.", amount: 1 },
//       { name: "Bataty", unit: "szt.", amount: 1 },
//     ],
//     spices: ["sól", "pieprz"],
//     bookmark: true,
//     image_url:
//       "https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/leczo-wegetarianskie-z-batatami.jpg",
//     description: `W szerokim garnku na oliwie zeszklić pokrojoną cebulę (co chwilę mieszając, ok. 8 minut).
//     Dodać obranego i pokrojonego w kostkę batata i smażyć co chwilę mieszając, przez ok. 5 minut.
//     Dodać przyprawy, wymieszać, wlać bulion i zagotować. Gotować bez przykrycia przez ok. 5 minut co chwilę mieszając.
//     Dodać pokrojoną w kosteczkę paprykę oraz starty czosnek. Gotować przez ok. 2 minuty.
//     Dodać pokrojoną w kosteczkę cukinię a po chwili dodać zmiksowane pomidory lub passatę. Gotować przez ok. 5 minut do miękkości cukinii.
//     Doprawić w razie potrzeby i wymieszać z posiekaną bazylią.`,
//   },
// ];

// catalog.forEach((ing) =>
//   state.catalog.push(
//     new Product(
//       ing.id,
//       ing.name,
//       ing.amount,
//       ing.unit,
//       ing.group,
//       ing.bookmark,
//       ing.expiry
//     )
//   )
// );

// storage.forEach((ing) =>
//   state.storage.push(
//     new Ingredient(
//       ing.id,
//       ing.name,
//       ing.amount,
//       ing.unit,
//       ing.group,
//       ing.bookmark,
//       ing.created_at,
//       ing.expiry
//     )
//   )
// );

// recipes.forEach((rec) => {
//   // Create ingredient instances
//   const ingredients = rec.ingredients.map(
//     (ing) =>
//       new Ingredient(
//         ing.id,
//         ing.name,
//         ing.amount,
//         ing.unit,
//         ing.group,
//         ing.bookmark,
//         ing.created_at,
//         ing.expiry
//       )
//   );

//   state.recipes.push(
//     new Recipe(
//       rec.id,
//       rec.name,
//       rec.group,
//       rec.description,
//       ingredients,
//       rec.spices,
//       rec.difficulty,
//       rec.bookmark,
//       rec.image_url
//     )
//   );
// });

export async function loadCatalog() {
  try {
    const data = await AJAX(API_URL_CATALOG);
    data.forEach((ing) => {
      state.catalog.push(
        new Product(
          ing.id,
          ing.name,
          ing.amount,
          ing.unit,
          ing.group,
          ing.bookmark,
          ing.expiry
        )
      );
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loadStorage() {
  try {
    const data = await AJAX(API_URL_STORAGE);
    data.forEach((ing) => {
      state.storage.push(
        new Ingredient(
          ing.id,
          ing.name,
          ing.amount,
          ing.unit,
          ing.group,
          ing.bookmark,
          ing.purchase_date,
          ing.expiry
        )
      );
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loadRecipes() {
  try {
    const data = await AJAX(API_URL_RECIPES);
    data.forEach((rec) => {
      // Create ingredient instances
      const ingredients = rec.ingredients.map(
        (ing) =>
          new Ingredient(
            ing.id,
            ing.name,
            ing.amount,
            ing.unit,
            ing.group,
            ing.bookmark,
            ing.purchase_date,
            ing.expiry
          )
      );

      // Create recipe instances
      state.recipes.push(
        new Recipe(
          rec.id,
          rec.name,
          rec.group,
          rec.description,
          ingredients,
          rec.spices,
          rec.difficulty,
          rec.bookmark,
          rec.image_url
        )
      );
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loadPlan() {
  try {
    const data = await AJAX(API_URL_PLAN);
    if (data.length === 0) return;
    data.forEach((week) => {
      // Create days for the week
      const days = week.days.map((day) => {
        const meals = day.meals.map((meal) => new Meal(meal));
        return new Day(day.name, meals);
      });

      state.plan.weeks.push(
        new Week(
          week.dateRange.startDate,
          week.dateRange.endDate,
          days,
          week.id
        )
      );
    });
    state.plan.weeks.sort(
      (a, b) =>
        new Date(a.dateRange.startDate).getTime() -
        new Date(b.dateRange.startDate).getTime()
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loadState() {
  try {
    const plan = await loadPlan();
    await loadStorage();
    await loadRecipes();
    await loadCatalog();
    console.log(`LOADED STATE FROM API:`);
    console.log(state);
    return plan;
  } catch (error) {
    throw error;
  }
}

export function getRecipe(id) {
  return state.recipes.find((recipe) => recipe.id === id);
}

export function getIngredient(id) {
  return state.storage.find((recipe) => recipe.id === id);
}

export function getDay(id) {
  return state.plan.activeWeek.days.find((day) => day.name === id);
}

export function deleteIngredient(ing) {
  // Get index of item to delete
  const index = state.storage.indexOf(ing);

  // Delete the item
  state.storage.splice(index, 1);
}

// Add the ingredients back from planned meal
export function restoreIngredients(meal) {
  // Get used Ingredients
  const ingredients = meal.used;

  ingredients.forEach((ing) => {
    // Try to find ingredient in storage
    const item = state.storage.find((item) => item.id === ing.id);

    // Add used amount back to storage
    if (item) item.amount += ing.amount;

    // If it doesn't exist, just move it to state
    if (!item) {
      state.storage.push(ing);
    }
  });
}
