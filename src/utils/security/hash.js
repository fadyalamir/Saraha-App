import bcrypt from 'bcrypt'

export const generateHash = ({ plaintext = "", salt = process.env.SALT } = {}) => {
  const hash = bcrypt.hashSync(plaintext, parseInt(salt))
  return hash
}

export const compareHash = ({ plaintext = "", hashValue = "" } = {}) => {
  const hash = bcrypt.compareSync(plaintext, hashValue)
  return hash
}