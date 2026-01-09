// middleware/validateRequest.ts
import { NextApiRequest, NextApiResponse } from 'next'

export function validateRequest(handler: any) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Add rate limiting, CORS, etc. here
      return await handler(req, res)
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}