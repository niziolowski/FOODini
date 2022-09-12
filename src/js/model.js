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
};

// Function takes a DOM object, reads dataset.color and value, then changes state accordingly
export function updateColorTheme(target) {
  const color = target.dataset.color;
  const value = target.value;
  const stateColor = state.colorTheme.find((el) => el.property === color);
  stateColor.value = value;
}
