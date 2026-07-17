import express from "express";
import dotenv from "dotenv";
import analyzeRoute from "./src/routes/analyze.js";
import healthRoute from "./src/routes/health.js";
import cors from "cors";
//-----------------------------------------------

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "*",   // during development only
}));
//-----------------------------------------------
//Routes
app.use("/analyze", analyzeRoute);
app.use("/health", healthRoute);

//------------------------------------------------
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
