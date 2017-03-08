export function updateListItem(list: any[], updated: any) {
  return list.map(item => updateItem(item, updated));
}

export function updateItem(item: any, updated: any) {
  return item['id'] === updated['id'] ? Object.assign({}, item, updated) : item;
}

export function removeItem(list: any[], removed: any) {
  return list.filter(item => item.id !== removed.id);
}

export function addItem(list: any[], added: any) {
  return [...list, added];
}
