import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("../swagger.json");

const PORT = process.env.PORT || 8000;
const app: Application = express();
const employeeRoute = require("./features/producer/route/employee.route");

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(employeeRoute);

app.listen(PORT, () => {
  console.log("server running on port: ", PORT);
});
