export function updateListItem(list: any[], updated: any) {
  return list.map(item => updateItem(item, updated));
}

export function updateItem(item: any, updated: any) {
  const updatedId = updated['id'];
  return item['id'] === updatedId ? Object.assign({}, item, updated) : item;
}

export function updateNewItem(item: any, updated: any, newId: any) {
  const prevId = updated['id'];
  return  item['id'] === updated['id'] ? Object.assign({}, item, updated, { id: newId, prevId: prevId}) : item;
}


export function removeItem(list: any[], removed: any) {
  return list.filter(item => item.id !== removed.id);
}

export function addItem(list: any[], added: any, id: any) {
  return [...list, Object.assign(added, {id: id})];
}
