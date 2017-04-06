// import { CompanyActions, CompanyContactActions } from './actions';
// import { createReducer } from './create-reducer';
// import { Company } from './models';
// import { addItem, updateItem, updateListItem, updateNewItem, removeItem, deepUpdateListItem, deepUpdateItem } from './utils';
// import { omit } from 'lodash';
// import path from 'immutable-path';
// export interface ICompanyState {
//     items: Company[];
//     selected: Company;
//     isLoading: boolean;
// }
// const INITIAL_STATE: ICompanyState = { items: [], selected: null, isLoading: false };

// export const companyReducer = createReducer(INITIAL_STATE, {
//   [CompanyActions.ADD_COMPANY_REQUEST](state, action) {
//     return Object.assign({}, state, {
//       isLoading: true
//     });
//   },
//   [CompanyActions.ADD_COMPANY_SUCCESS](state, action) {
//       return Object.assign({}, state, {
//         items: addItem(state.items, action.company),
//         selected: updateNewItem(state.selected, action.company, action.prevId),
//         isLoading: false
//       });
//   },
//   [CompanyActions.REMOVE_COMPANY](state, action) {
//     return Object.assign({}, state, { items: removeItem(state.companies, action.company)});
//   },
//   [CompanyActions.UPDATE_COMPANY_REQUEST](state, action) {
//     return Object.assign({}, state,
//       {
//         isLoading: true
//       });
//   },
//   [CompanyActions.UPDATE_COMPANY_SUCCESS](state, action) {
//     return Object.assign({}, state,
//       {
//         selected: updateItem(state.selected, action.company),
//         isLoading: false
//       });
//   },
//   // ['test'](state, action) {
//   //   return Object.assign({}, state,
//   //     {
//   //       selected: deepUpdateListItem(state.items, action.parentId,
//   //         (company) => deepUpdateListItem(company.stops, stop.id, 
//   //           (stop) => updateListItem())),
//   //       isLoading: false
//   //     });
//   // },
//   [CompanyActions.GET_ALL_COMPANIES](state, action) {
//     return Object.assign({}, state, { items: action.items.slice(), selected: null});
//   },
//   [CompanyActions.SELECT_COMPANY](state, action) {
//     return Object.assign({}, state, { selected: action.company});
//   },
//   // [CompanyContactActions.ADD_COMPANY_CONTACT_SUCCESS](state, action) {
//   //   const companyId = state.selected.id;
//   //   return Object.assign({}, state,
//   //     { items:
//   //       path.map(state, `items[id=${companyId}].contacts[id=${action.id}`, x => x + 10 );
//   //       selected: updateNewItem(state.selected, action.contact, action.prevId),
//   //       isLoading: false
//   //    });
//   // },
// });

