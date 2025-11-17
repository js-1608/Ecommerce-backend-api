import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {

    // 1 read the token
    const token = req.headers['authorization'];


    // 2 if no token return error
    if (!token) {
        return res.status(401).send("Un authorized access ")
    }


    // 3 check token is valid or not 
    try {
        const payload = jwt.verify(token, "G9sjXH1FoXcnvwhICRRi1onwJDgrxGtN");
        // console.log(payload);
        // adding user id req
        req.userId=payload.userId;


    } catch (err) {
    //4 return error
        return res.status(401).send("Invalid")
    }
    // 5 call next midelware
    next();
}

export default jwtAuth