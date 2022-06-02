import cors from 'cors';
import express from 'express';
import {
  viewsRouter,
  userRouter,
  orderRouter,
  productRouter,
  categoryRouter,
  adminRouter,
  searchRouter,
  reviewRouter,
  imageRouter,
} from './routers';
import { errorHandler } from './middlewares';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const app = express();
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// CORS 에러 방지
app.use(cors());

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// html, css, js 라우팅
app.use(viewsRouter);

// api 라우팅
// 아래처럼 하면, userRouter 에서 '/login' 으로 만든 것이 실제로는 앞에 /api가 붙어서
// /api/login 으로 요청을 해야 하게 됨. 백엔드용 라우팅을 구분하기 위함임.
app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/orders', orderRouter);
app.use('/api/search', searchRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/images', imageRouter);

//카카오 소셜 로그인

// 순서 중요 (errorHandler은 다른 일반 라우팅보다 나중에 있어야 함)
// 그래야, 에러가 났을 때 next(error) 했을 때 여기로 오게 됨
app.use(errorHandler);

export { app };
