import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY ?? 'umpisa-secret-key'

export const generateAccessToken = (body: any) => {
  return jwt.sign(body, SECRET_KEY, { expiresIn: '30d' })
}

export const verifyToken = (jwtToken: string): Promise<jwt.JwtPayload & { _id: string, email: string }> => {
  return new Promise((resolve, reject) => {
    try {
      const token = jwtToken.replace(/bearer /i, '')
      jwt.verify(token, SECRET_KEY, (err, user: any) => {
        if (err) reject(err);

        resolve(user)
      })

    } catch (error) {
      reject(error)
    }
  })
}
