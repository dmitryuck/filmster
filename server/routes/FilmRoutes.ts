import express, { Request, Response } from 'express';
import { buildRouteUrl } from '../common/ServerUtils';
import ResponseObject from '../classes/ResponseObject';
import ServerApi from '../enums/ServerApi';
import FilmService from '../services/FilmService';
import { cacheMiddleware, cacheStore } from '../common/CacheMiddleware';


const router = express.Router();

router.get(buildRouteUrl(ServerApi.FETCH_FILMS), cacheMiddleware, async(req: Request, res: Response) => {
  const { search, page } = req.query;

  const result = await FilmService.fetchFilms(search, page);

  cacheStore[search + '-' + page] = result;

  ResponseObject.success(res, result);
});

export default router;
