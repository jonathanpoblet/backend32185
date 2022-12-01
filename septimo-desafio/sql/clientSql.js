import createKnexClient from 'knex';
import { mysqlConfig } from '../config/config.js';

export const clientSql = createKnexClient(mysqlConfig);