import { connect } from 'mongoose';
import { ENV_VAR } from './index.js';

export async function connectDB() {
    return connect(ENV_VAR.DB_URI)
}

