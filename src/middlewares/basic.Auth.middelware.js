import UserModel from "../features/user/user.model.js";
const basicAuth = (req, res, next) => {
    // 1 check authation is empty
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        return res.status(401).send("No Authorization details found");
    }

    // 2. extract the credentials.
    const base64credentials = authHeader.replace('Basic', '');
    console.log(base64credentials);

    // 3 decode credentials.
    const decodedCreds = Buffer.from(base64credentials, 'base64').toString('utf-8');
    console.log(decodedCreds)

    const creds = decodedCreds.split(':');

    const user = UserModel.getAll().find(u => u.email == creds[0] && u.password == creds[1]);
    if (user) {
        next();
    } else {
        return res.status(401).send("Invalid Credentials");
    }
}

export default basicAuth