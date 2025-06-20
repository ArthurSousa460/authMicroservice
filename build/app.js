import express from "express";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import router from "./routes.js";
import specs from './swagger/swaggerConfig.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(router);
export default app;
//# sourceMappingURL=app.js.map