import mongoose from 'mongoose'
import { logger } from '../../src/Utils';
const {MONGO_URI} = require('..')

const connectToDatabase = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(MONGO_URI);
        logger.info('Connection DB Success!')
    } catch {                
        logger.error('DB connection failed')
        process.exit(1)        
    }
}

const disconnectFromDatabase = async () => {
    await mongoose.connection.close()
    logger.info("Disconnect from database")
}

export { connectToDatabase, disconnectFromDatabase }
