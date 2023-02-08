import jwt from "jsonwebtoken";
import log from "../config/logging.js";
import User from "../Models/User.js";

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ error: 'Authorization token is required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        req.user = await User.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        log.error(error);
        res.status(401).send({ error: "Request token is not authorized" });
    }
}

export default requireAuth;