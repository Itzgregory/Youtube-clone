import { connectToDatabase, disconnectFromDatabase } from '../../config/db/connection'
import { logger } from '../Utils'
import { app } from './server'
const { PORT } = require( '../../config')

const server =  app.listen(PORT || 9000, async() => {
    await connectToDatabase()  
    logger.info(`Server listening on port ${PORT}`)})
 

const signals = ['SIGTERM', 'SIGINT']

function gracefullShutdown(signal: string){
    process.on(signal, async() => {
        logger.info("Goodbye, got signal", signal)
        server.close()
    await disconnectFromDatabase();

    logger.info("My work here is done")

    process.exit(0)
    })
}

for(let i=0; i< signals.length; i++ ){
    gracefullShutdown(signals[i])
}




