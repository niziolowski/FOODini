import * as model from "../../model.js";

export function deleteItem(id) {
  // get item
  const item = model.state.catalog.find((item) => item.id === id);
  const i = model.state.catalog.indexOf(item);
  // delete
  model.state.catalog.splice(i, 1);
}
