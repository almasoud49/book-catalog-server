import express from 'express';
import { BookRoutes } from '../modules/book/book.route';

const router = express.Router();


//shared Routes

const defaultRoutes = [

  {
    path: '/books',
    route: BookRoutes,
  }

];

defaultRoutes.forEach(route=> {
  router.use(route.path, route.route);
});

export default router;