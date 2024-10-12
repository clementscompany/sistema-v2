import { SECRET_KEY } from "../../config/env.js";
import jwt from "jsonwebtoken";

class JWT {
  constructor(jwt) {
    this.jwt = jwt;
    this.options = {
      algorithm: "HS256",
      expiresIn: "12h"
    };
  }

  // Gera um token JWT
  Generate(payload) {
    return new Promise((resolve, reject) => {
      this.jwt.sign(payload, SECRET_KEY, this.options, (err, token) => {
        if (err) {
          return reject(err);
        }
        resolve(token);
      });
    });
  }

  // Verifica e decodifica um token JWT
  Verify(token) {
    return new Promise((resolve, reject) => {
      this.jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
          return reject({ error: err });
        }
        resolve({ payload: decoded });
      });
    });
  }

  DecodeJson(token) {
    return this.jwt.decode(token);
  }

}

export default new JWT(jwt);
