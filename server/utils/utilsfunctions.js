import jwt from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'


export async function deleteImages(name) {
    const uploadsPath = path.resolve('uploads/')
    const fullPath = path.join(uploadsPath, name)
    if (fs.existsSync(fullPath)) {
        fs.unlink(fullPath, err => {
            if (err) console.error('Error deleting file:', err);
        });
    }
}


const secretkey = 'randomkey'

export async function generateAccessToken (admin){
    const payload = {
        admin
    }
    return jwt.sign(payload, secretkey, {expiresIn: "10h" })
}



