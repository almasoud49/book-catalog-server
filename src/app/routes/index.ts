import express from 'express';

const router = express.Router();


//shared Routes

const defaultRoutes = [
{
  
}
];

defaultRoutes.forEach(route=> {
  router.use(route.path, route.route);
});

export default router;