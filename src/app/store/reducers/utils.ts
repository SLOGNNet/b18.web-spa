export function mergeLists(listById: any, newListById: any) {
   const result = Object.assign({}, listById, newListById);
   return result;
}

export function addItem(byId: any, added: any) {
  return {...byId, [added.id]: { added }};
}

export function addChild(entityState: any, entityId: string, childName: string, childId: string, toEnd: boolean = false) {
   const result = {
      ...entityState,
      [entityId]: {
        ...entityState[entityId],
        [childName]: toEnd ? [...entityState[entityId][childName], childId] : [childId, ...entityState[entityId][childName]]
      }
    };
    return result;
}

export function removeChild(entityState: any, entityId: string, childName: string, childId: string) {
   const result = {
      ...entityState,
      [entityId]: {
        ...entityState[entityId],
        [childName]: entityState[entityId][childName].filter(id => id !== childId)
      }
    };
    return result;
}
