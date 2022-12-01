import { ClassMysql } from '../class/classMysql.js';
import { clientSql } from '../sql/clientSql.js';

export const containerProducts = new ClassMysql(clientSql, 'products');