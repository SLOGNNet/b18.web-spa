import { merge } from 'lodash';

export function updateItem(byId: any, updated: any) {
    return { ...byId, [updated.id]: {
        ...byId[updated.id],
        ...updated
      }
    };
}

export function deleteItem(byId: any, deletedId: string) {
     const result = {...byId};
     delete result[deletedId];
     return result;
}

export function updateNewItem(byId: any, updated: any, prevId: any) {
    delete byId.prevId;
    return { ...byId, [updated.id]: {
        ...updated,
        prevId
      }
    };
}

export function mergeLists(listById: any, newListById: any) {
   const result = Object.assign({}, listById, newListById);
   return result;
}

export function addItem(byId: any, added: any) {
  return {...byId, [added.id]: { added }};
}

export function addChild(entityState: any, entityId: string, childName: string, childId: string) {
   const result = {
      ...entityState,
      [entityId]: {
        ...entityState[entityId],
        associationName: [childId, ...entityState[entityId][childName]]
      }
    };
    return result;
}

export function removeChild(entityState: any, entityId: string, childName: string, childId: string) {
   const result = {
      ...entityState,
      [entityId]: {
        ...entityState[entityId],
        associationName: entityState[entityId][childName].filter(id => id !== childId)
      }
    };
    return result;
}
