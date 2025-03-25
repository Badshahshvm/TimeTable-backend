const express = require("express");
const userRouter = require("./routes/User")
const subjectRouter = require("./routes/Subject")
const facultyRouter = require("./routes/Faculty")
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT
const app = express();


mongoose.connect(process.env.MONGO_URL)
              .then(() => console.log("Database is connected"))
              .catch((error) => console.log("Database connection failed:", error));

app.use(cors());
app.use(express.json());

//Routes are defined
app.use("/api/v1/user", userRouter)
app.use("/api/v1/subject", subjectRouter)
app.use("/api/v1/faculty", facultyRouter)
app.listen(PORT, () => {
              console.log(`Server is running on port ${PORT}`);
});
