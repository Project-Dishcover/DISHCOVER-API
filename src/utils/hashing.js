import bcrypt from 'bcrypt'

export async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

export function comparePassword(password, hash) {
  const match = bcrypt.compareSync(password, hash);
  return match;
}


