import jwt from "jsonwebtoken"; // Importing the jsonwebtoken library
import { jwtErrorHandler } from "./error.js";

// Middleware function to verify the access token
export const verifyToken = (request, response, next) => {
  const token = request.cookies.accessToken; 

  if (!token) {
    return next(jwtErrorHandler(401, "You are not Authenticated"));
  }

  // Verifying the token using jsonwebtoken library
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
   
    if (error) return next(jwtErrorHandler(403, "Token is not valid"));

    
    request.user = user; 

    next(); 
  });
};
