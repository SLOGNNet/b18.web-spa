export function updateItem(list: any[], updated: any) {
  return list.map(item => item['id'] === updated['id'] ? Object.assign({}, item, updated) : item);
}

export function removeItem(list: any[], removed: any) {
    return list.filter(item => item.id !== removed.removed.id);
}

export function addItem(list: any[], added: any) {
    return [...list, added];
}
