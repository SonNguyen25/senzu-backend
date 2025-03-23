import "dotenv/config";
import Hello from "./Hello.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import FriendRoutes from "./Friends/routes.js";
import ChatRoutes from "./OpenAI/routes.js";
import UsersRoutes from "./Users/routes.js";
import PostRoutes from "./Posts/routes.js";
import CommentRoutes from "./Comments/routes.js";
import FollowRoutes from "./Follow/routes.js";


const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/senzu";
mongoose.connect(CONNECTION_STRING);
const app = express();
// console.log(process.env.OPENAI_API_KEY);
app.use(cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL, "http://localhost:3000", process.env.HTTP_SERVER_DOMAIN, 'https://senzusocial.netlify.app'],
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
   allowedHeaders: ["Content-Type","Authorization"],
}));
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
ChatRoutes(app);
UsersRoutes(app);
FriendRoutes(app);
FollowRoutes(app);

PostRoutes(app);
CommentRoutes(app);
app.listen(process.env.PORT || 4000);
