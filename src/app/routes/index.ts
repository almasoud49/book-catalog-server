import express from 'express';
import { BookRoutes } from '../modules/book/book.route';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = express.Router();


//shared Routes

const defaultRoutes = [

  {
    path: '/book',
    route: BookRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  }

];

defaultRoutes.forEach(route=> {
  router.use(route.path, route.route);
});

export default router;