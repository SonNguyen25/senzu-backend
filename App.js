import "dotenv/config";
import Hello from "./Hello.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import ChatRoutes from "./OpenAI/routes.js";
import UsersRoutes from "./Users/routes.js";

const app = express();

app.use(cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL, "http://localhost:3000", process.env.HTTP_SERVER_DOMAIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/senzu";
mongoose.connect(CONNECTION_STRING,
    // { useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     tls: true, }
    );

// console.log(process.env.OPENAI_API_KEY);

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.HTTP_SERVER_DOMAIN,
    };
}
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(
    session(sessionOptions)
);
Hello(app);
<<<<<<< HEAD
ChatRoutes(app);
UsersRoutes(app);
=======
Routes(app);
>>>>>>> 6037d6e (set up routes for exercise db api)
app.listen(process.env.PORT || 4000);

