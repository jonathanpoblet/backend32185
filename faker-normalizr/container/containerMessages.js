//Conectado a SQL
import { ClassMysql } from '../class/classMysql.js';
import { clientSql } from '../sql/clientSql.js';
//export const containerMessages = new ClassMysql(clientSql, 'messages');

//Conectado a mongo
import { ClassMongoDB } from '../class/classMongoDB.js';
import { collectionMessagesMongoDB } from '../config/config.js';

export const containerMessages = new ClassMongoDB(collectionMessagesMongoDB)
