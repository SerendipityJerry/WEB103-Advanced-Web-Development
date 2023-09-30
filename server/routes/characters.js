import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import CharacterController from '../controllers/characters.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()
router.get('/', CharacterController.getCharacters)

router.get('/:characterId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../public/character.html'))
})

export default router