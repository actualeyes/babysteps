import { FastifyReply, FastifyRequest } from 'fastify'
import bcrypt from 'bcrypt'
import { db } from '../../db'
import { users } from 'src/db/schema/users'
import { eq } from 'drizzle-orm'
const SALT_ROUNDS = 10

export type CreateUserSchema = {
  name: string
  email: string
  password: string
  age: number
}

type NewUser = typeof users.$inferInsert

export async function createUser(
  req: FastifyRequest<{
    Body: CreateUserSchema
  }>,
  reply: FastifyReply
) {
  const { password, email, name, age } = req.body
  console.log('Email', email)

  const result = await db.select().from(users).where(eq(users.name, name))
  if (result) {
    return reply.code(401).send({
      message: 'User already exists with this email'
    })
  }
  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS)
    const newUser: NewUser = {
      name,
      email,
      age,
      password: hash
    }

    await db.insert(users).values(newUser)
    console.log('New User Created')

    console.log(result)
  } catch (e) {
    return reply.code(500).send(e)
  }
}
