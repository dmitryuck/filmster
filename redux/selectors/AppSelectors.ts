import RootState from '../include/RootState';


export const getFilms = (rootState: RootState) => rootState?.appState?.films;
export const getPage = (rootState: RootState) => rootState?.appState?.page;
export const getTotal = (rootState: RootState) => rootState?.appState?.total;
export const getLoading = (rootState: RootState) => rootState?.appState?.loading;
export const getMessage = (rootState: RootState) => rootState?.appState?.message;
