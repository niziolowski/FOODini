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
  products: new Set([
    {
      name: "Jajka",
      amount: 5,
    },
    {
      name: "Jajka",
      amount: 5,
    },
    {
      name: "Jabłka",
      amount: 10,
    },
    {
      name: "Mąka",
      amount: 1,
    },
  ]),
};
