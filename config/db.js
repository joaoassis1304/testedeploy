import pg from 'pg'
import dotenv from "dotenv"
dotenv.config()

// const cliente = new pg.Client({
//         connectionString : process.env.CONNECTION_STRING
// })

const cliente = new pg.Pool({
        connectionString: process.env.CONNECTION_STRING,
        max: 20,                  // Número máximo de conexões no pool
        idleTimeoutMillis: 30000, // Tempo de espera antes de fechar uma conexão ociosa
        connectionTimeoutMillis: 50000, // Tempo limite para estabelecer uma conexão
      });

//cliente.connect()

export default cliente