import { getExtRequest } from '../common/ServerUtils';
import Const from '../enums/Const';


export default class FilmService {
  static async fetchFilms(search: string, page: string) {
    return await getExtRequest(Const.API_URL, { s: search, page, apikey: Const.API_KEY });
  }
}