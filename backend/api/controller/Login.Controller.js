import JWT from "../../auth/jwt/Jwt.js";
import { DecodePassword, GeneratePassword } from "../../auth/Password.js";
import UserModel from "../../database/models/User.Model.js";

class LoginController {
  //Register
  async Register(req, res) {
    const { username } = req.body;
    if (username) {
      try {
        const data = { username: username };
        const result = await UserModel.Create(data);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: "Erro: " + error.error });
      }
    } else {
      res.status(400).json({ error: "Username obrigatório." });
    }
  }

  //Set Passwod 
  async SetPassword(req, res) {
    const { username, password, id } = req.body;
    try {
      const hashPassword = await GeneratePassword(password);
      const data = { password: hashPassword.senha, id: id };
      const response = await UserModel.SetPassword(data);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ error: "Erro: " + error?.error });
      console.log(error.error);
    }
  }

  ///get all users
  async GetAll(req, res) {
    try {
      const result = await UserModel.GetAll();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error?.error });
      console.log(error.error);
    }
  }

   //SearchUsers
   async Search(req, res) {
    try {
      const data = req.params.data
      const result = await UserModel.SearchUser(data);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error?.error });
      console.log(error.error);
    }
  }

  //Delete Data
  async Delete(req, res) {
    try {
      const { id } = req.body;
      const tokenUser = req.headers.authorization.replace("Bearer ", "");
      const decoded = JWT.DecodeJson(tokenUser);
      const idLoged = parseInt(decoded.id);
      const deleteId = parseInt(id);
      if (idLoged === deleteId ) {
        res.status(200).json({ error:"Não pode realizar esta ação"})
        return;
      }
      const data = await UserModel.DeleteUser(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error?.error })
      console.log(error.error);
    }
  }

  //Login 
  async Sigin(req, res) {
    const { username, password } = req.body;
    if (username && password) {
      try {
        const result = await UserModel.Login(req.body);
        const { error, success } = result;
        if (error) {
          res.status(200).json({ error: error });
          return; //if an error on request DATABASE 
        }
        const userPass = success?.password;
        const passVerify = await DecodePassword(password, userPass);
        if (!passVerify.status) {
          res.status(200).json({ error: "Usuário ou senha incorretos!" });
          return; /// if incorrectcredentials 
        }
        const token = await JWT.Generate(success);
        res.status(200).json({ success: "Credenciais confirmadas com sucesso!", token: token });
      } catch (error) {
        res.status(500).json({ error: "Erro: " + error?.error });
      }
    } else {
      res.status(400).json({ error: "Username e password são obrigatórios." });
    }
  }
}

export default new LoginController();
