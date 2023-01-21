import { commodityActions } from '../../store/code/commoditySlice';
import * as actionFactory from '../../utilities/actionFactory';

const url = '/commodities';

export const getAll = actionFactory.getAll(url, commodityActions);
export const getOne = actionFactory.getOne(url, commodityActions);
export const createOne = actionFactory.createOne(url, commodityActions);
export const updateOne = actionFactory.updateOne(url, commodityActions);
export const deleteOne = actionFactory.deleteOne(url, commodityActions);
export const reset = commodityActions.reset;
