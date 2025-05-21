import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req, res) {
  const error = req.query.error || 'Unknown error';
  res.status(401).json({ error: `Authentication failed: ${error}` });
}