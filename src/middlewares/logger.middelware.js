import fs from "fs"
import winston from "winston";


const fsPromises =fs.promises;

// async function log(logData) {
//     try{
//         await fsPromises.appendFile("log.txt" ,logData);
//     }catch (err){
//         console.log(err)
//     }
// }

// logging system using winston
const logger=winston.createLogger(

    {
        level:'info',
        format:winston.format.json(),
        defaultMeta:{service:'request-logger'},
        transports:[
            new winston.transports.File({filename:'log.txt'})
        ]

    }

)

const loggermiddlware=async (req,res,next)=>{
    // 1 Log req body.
    const logData = `${new Date().toString()}req URL: ${req.originalUrl}reqBody: ${JSON.stringify(req.body)}`;
    // await log(logData);

    logger.info(logData);
    next();

}

export default loggermiddlware