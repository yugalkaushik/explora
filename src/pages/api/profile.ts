// pages/api/profile.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI!

async function connectToMongoDB() {
  const client = await MongoClient.connect(MONGODB_URI)
  return client
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await connectToMongoDB()
  const db = client.db('explora')
  const collection = db.collection('User')

  try {
    if (req.method === 'GET') {
      const { email } = req.query

      if (!email) {
        return res.status(400).json({ error: 'Email is required' })
      }

      const user = await collection.findOne({ email })
      await client.close()

      if (user) {
        return res.status(200).json(user)
      }
      return res.status(404).json({ message: 'User not found' })
    }

    if (req.method === 'POST') {
      const { email, name, phoneNumber, address } = req.body

      if (!email) {
        return res.status(400).json({ error: 'Email is required' })
      }

      // Update or insert the profile
      const result = await collection.updateOne(
        { email },
        {
          $set: {
            name,
            email,
            phoneNumber,
            address,
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      )

      await client.close()
      return res.status(200).json({
        message: 'Profile updated successfully',
        success: true,
      })
    }

    // Method not allowed
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    await client.close()
    console.error('Profile API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
