import jwt from 'jsonwebtoken';

// We use an environment variable for our JWT secret to keep our signing key secure.
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// This middleware ensures that protected routes are only accessed by authenticated users.
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // contains { id: ... }
    next();
  } catch (error) {
    // If verification fails, we return a 401 error to prevent unauthorized access.
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticate;
