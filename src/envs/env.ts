import { config } from 'dotenv'
config() // Load environment variables from .env file
export const {
    DATABASE_URL,
    JWT_SECRET
}= process.env