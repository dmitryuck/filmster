import express, { Request, Response } from 'express';
import { buildRouteUrl } from '../common/ServerUtils';
import AppRoutes from '../enums/AppRoutes';
import FilmService from '../services/FilmService';


const router = express.Router();

router.put(buildRouteUrl(AppRoutes.index), async(req: Request, res: Response) => {
  return {

  };
});

export default router;