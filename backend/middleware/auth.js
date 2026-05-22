import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Missing token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.userId = decoded.id;
    req.user = { id: decoded.id }; // Add user object for consistency
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Named export for compatibility
export const verifyToken = auth;
