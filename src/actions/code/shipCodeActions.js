import { shipCodeActions } from '../../store/code/shipCodeSlice';
import * as actionFactory from '../../utilities/actionFactory';

const url = '/ship-codes';

export const getAll = actionFactory.getAll(url, shipCodeActions);
export const getOne = actionFactory.getOne(url, shipCodeActions);
export const createOne = actionFactory.createOne(url, shipCodeActions);
export const updateOne = actionFactory.updateOne(url, shipCodeActions);
export const deleteOne = actionFactory.deleteOne(url, shipCodeActions);
export const reset = shipCodeActions.reset;
