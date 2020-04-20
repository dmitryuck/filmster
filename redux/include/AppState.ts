import Film from '../../server/interfaces/Film';


export default interface AppState {
  films: Film[];
  page: number;
  total: number;
  loading: boolean;
  message: string;
}