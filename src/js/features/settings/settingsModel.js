import { state } from "../../model.js";

// Function takes a DOM object, reads dataset.color and value, then changes state accordingly
export function updateColorTheme(target) {
  const color = target.dataset.color;
  const value = target.value;
  const stateColor = state.colorTheme.find((el) => el.property === color);
  stateColor.value = value;

  //   Return updated color theme for the view function
  return state.colorTheme;
}
