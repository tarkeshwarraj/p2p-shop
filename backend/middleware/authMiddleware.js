import jwt from 'jsonwebtoken';

    export const authMiddleware = (req, res, next) =>{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({error: "Access denied. No token provided."});
        }

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
            // console.log(req.user);
        }catch(error){
            res.status(400).json({error: "Invalid token."})
        }
    }