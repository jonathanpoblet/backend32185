import { ClassMysql } from '../class/classMysql.js';
import { clientSql } from '../sql/clientSql.js';

export const containerMessages = new ClassMysql(clientSql, 'messages');