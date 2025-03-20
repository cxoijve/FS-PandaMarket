const express = require("express");
const router = require("./modules/index.module");
const cors = require("cors");

const app = express();
const PORT = 5050;

// app.use(cors());
// CORS 설정 추가
app.use(
  cors({
    origin: "*", // 또는 "http://localhost:3000"
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}...`);
});
