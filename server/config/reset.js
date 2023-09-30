import { pool } from './database.js'
import './dotenv.js'
import characterData from '../data/characters.js'

const createCharactersTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS characters;

        CREATE TABLE IF NOT EXISTS characters (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            icon VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            country VARCHAR(255) NOT NULL,
            description TEXT NOT NULL
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 characters table created successfully')
    } catch (err) {
        console.error('⚠️ error creating characters table', err)
    }
}

const seedCharactersTable = async () => {
    await createCharactersTable()

    characterData.forEach((character) => {
        const insertQuery = {
            text: 'INSERT INTO characters (name, icon, image, country, description) VALUES ($1, $2, $3, $4, $5)'
        }

        const values = [
            character.name,
            character.icon,
            character.image,
            character.country,
            character.description
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting character', err)
                return
            }

            console.log(`✅ ${character.name} added successfully`)
        })
    })
}

seedCharactersTable()