import  { Pool }  from 'pg';

export const pool = new Pool({
    user: 'giorgobg',
    host: 'localhost',
    database: 'giorgobg',
    password: '', // No password in the default setup
    port: 5432,
});