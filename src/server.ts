import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 4000;

import investorRoute from "./routes/investorRoute";
import fundRoute from "./routes/fundRoute";
import sipRoute from "./routes/sipRoute";
import dashboardRoute from "./routes/dashboardRoutes";
//import { login,logout } from "./controllers/investorController";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/investors", investorRoute);
app.use("/api/funds", fundRoute);
app.use("/api/sips", sipRoute);
app.use("/api/dashboard", dashboardRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
