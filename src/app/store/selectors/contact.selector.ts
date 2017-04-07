import { IAppState } from '../root-reducer';
import { denormalize } from 'normalizr';
import { contactSchema, Contact } from '../../models';

export const selectContact = (state: IAppState, id: string): Contact => denormalize(id,
  contactSchema,
  state.entities);

export const selectDetailContact = (state: IAppState): Contact => {
  return selectContact(state, state.ui.contacts.selected);
};
