import express, { Application, Request, Response , NextFunction }  from 'express'
import cors from 'cors';
import routes from './app/routes'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import {handleNotRouteFound} from './errors/handleNotRouteFound'
const app: Application = express();


app.use(cors());
app.use(cookieParser());

//parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req: Request, res: Response)=>{
  res.send('Books Catalog Server is Running!');
});

//routes
app.use('/api/v1', routes);

//test route
app.get('/test', async (req: Request, res: Response, next: NextFunction) => {});


//Global Error Handler
app.use(globalErrorHandler);


//handle no Route Found Error
app.use(handleNotRouteFound);


export default app;