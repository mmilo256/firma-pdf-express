import { dirname, join } from 'path'
import e from 'express'
import 'dotenv/config'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'
import crypto from 'node:crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = e()

// VARIABLES DE ENTORNO
const PORT = process.env.PORT || 4000
const ENTITY = process.env.ENTITY
const API_TOKEN_KEY = process.env.API_TOKEN_KEY
const RUN = process.env.RUN
const PURPOSE = process.env.PURPOSE
const SECRET_KEY = process.env.SECRET_KEY
const API_ENDPOINT = process.env.API_ENDPOINT

const copyFile = async (filename) => {
    // Ruta del archivo PDF a firmar
    const originalPath = join(__dirname, "input", filename)
    const copyPath = join(__dirname, "input", `copy_${filename}`)

    // Copiar archivo
    await fs.copyFile(originalPath, copyPath)
    return copyPath
}
const file = await copyFile("decreto1.pdf")
const pdfToBase64 = async () => {
    try {
        const data = await fs.readFile(file)
        const base64 = data.toString('base64')
        return base64
    } catch (error) {
        console.log(error)
    }
}
const base64 = await pdfToBase64()
const hash = crypto.createHash('sha256').update(base64, 'utf8').digest();

// Inicializar servidor
app.listen(PORT, () => {
    console.log("Escuchando en el puerto", PORT)
})

