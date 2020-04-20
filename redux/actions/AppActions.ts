import Film from '../../server/interfaces/Film';


export default class AppActions {
  static SET_FILMS = 'SET_FILMS';
  static SET_PAGE = 'SET_PAGE';
  static SET_TOTAL = 'SET_TOTAL';
  static SET_LOADING = 'SET_LOADING';
  static SET_MESSAGE = 'SET_MESSAGE';

  static setFilms = (films: Film[]) => ({ type: AppActions.SET_FILMS, payload: films });
  static setPage = (page: number) => ({ type: AppActions.SET_PAGE, payload: page });
  static setTotal = (value: number) => ({ type: AppActions.SET_TOTAL, payload: value });
  static setLoading = (value: boolean) => ({ type: AppActions.SET_LOADING, payload: value });
  static setMessage = (message: any) => ({ type: AppActions.SET_MESSAGE, payload: message });
}
