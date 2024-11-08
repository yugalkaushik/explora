import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;

async function connectToMongoDB() {
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let client;
  try {
    client = await connectToMongoDB();
    const db = client.db('explora');
    const collection = db.collection('User');

    if (req.method === 'GET') {
      const { email } = req.query;

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      const user = await collection.findOne({ email });
      await client.close();

      if (user) {
        return res.status(200).json(user);
      }
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.method === 'POST') {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      await collection.updateOne(
        { email },
        { $set: { email } },
        { upsert: true }
      );
      await client.close();

      return res.status(200).json({
        message: 'Profile updated successfully',
        success: true,
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    if (client) {
      await client.close();
    }
    console.error('Profile API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}