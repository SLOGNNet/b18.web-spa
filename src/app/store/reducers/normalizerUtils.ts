import { assign } from 'lodash';

export function updateItem(byId: any, updated: any) {
    return { ...byId, [updated.id]: {
        ...byId[updated.id],
        ...updated
      }
    };
}

export function deleteItem(byId: any, deletedId: string) {
     const result = {...byId};
       debugger;
     delete result[deletedId];
     debugger;
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
   return assign({}, listById, newListById);
}

export function addItem(byId: any, added: any) {
  return {...byId, [added.id]: { added }};
}
