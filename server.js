require("dotenv").config();

const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

const investorRoute = require("./routes/investorRoute");
const fundRoute = require("./routes/fundRoute");
const sipRoute = require("./routes/sipRoute");
const dashboardRoute =require("./routes/dashboardRoutes");
const { login, logout } = require("./controllers/investorController");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/investors", investorRoute);
app.use("/api/funds", fundRoute);
app.use("/api/sips", sipRoute);
app.use("/api/dashboard",dashboardRoute);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
