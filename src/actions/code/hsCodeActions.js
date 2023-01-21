import { hsCodeActions } from '../../store/code/hsCodeSlice';
import * as actionFactory from '../../utilities/actionFactory';

const url = '/hs-codes';

export const getAll = actionFactory.getAll(url, hsCodeActions);
export const getOne = actionFactory.getOne(url, hsCodeActions);
export const createOne = actionFactory.createOne(url, hsCodeActions);
export const updateOne = actionFactory.updateOne(url, hsCodeActions);
export const deleteOne = actionFactory.deleteOne(url, hsCodeActions);
export const reset = hsCodeActions.reset;
