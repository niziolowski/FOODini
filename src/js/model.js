// § STATE
export const state = {
  colorTheme: [
    { property: "--bg-color", value: "#f5f5f5" },
    { property: "--accent-color", value: "#516e94" },
    { property: "--font-color", value: "#333333" },
    { property: "--tag1-color", value: "#ffe047" },
    { property: "--tag2-color", value: "#7ab4ff" },
    { property: "--tag3-color", value: "#dd6b6b" },
  ],
  storage: [
    {
      id: 1,
      createdAt: 1660643417457,
      name: "Jajka",
      amount: 10,
      unit: "szt.",
      expiry: 14,
      bookmark: true,
      group: "świeże",
      daysLeft: 3,
    },
    {
      id: 2,
      createdAt: 1660643655319,
      name: "Mięso",
      amount: 1,
      unit: "kg",
      expiry: 3,
      bookmark: false,
      group: "świeże",
      daysLeft: 10,
    },
    {
      id: 3,
      createdAt: 1660645683669,
      name: "Mąka",
      amount: 2,
      unit: "kg",
      expiry: 100,
      bookmark: false,
      group: "suche",
      daysLeft: 73,
    },
  ],
  tags: {
    storage: ["świeże", "suche", "mrożone"],
    recipes: ["śniadanie", "obiad", "kolacja"],
  },
  recipes: [
    {
      id: 1,
      createdAt: 1661700093430,
      title: "Jajecznica",
      group: "śniadanie",
      difficulty: 1,
      bookmark: false,
      imageUrl:
        "https://cdn.galleries.smcloud.net/t/photos/gf-bc5p-Ttbo-1SJC_jajecznica-podstawowy-przepis-na-klasyczna-potrawe-z-rozmaconych-jajek.jpg",
      description: "Normalnie, jajka rozbić na patelnii i smażyć aż się zetno.",
      ingredients: [{ foodini_storage_id: 1, quantity: 4, unit: "szt." }],
    },
  ],
};
