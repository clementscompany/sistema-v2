import { DB } from "../db.js";
class UserModel {
  Create(data) {
    return new Promise((resolve, reject) => {
      const { username } = data;
      if (username) {
        DB.get("SELECT * FROM admin WHERE admin.username = ? ", username, (err, data) => {
          if (err) {
            return reject({ error: "Erro ao cadastrar o admin: " + err });
          }
          if (data) {
            return resolve({ error: "Este usuário já foi cadastrado!" });
          }
          this.insert = ("INSERT INTO admin (username) VALUES (?)");
          DB.run(this.insert, [username], (err) => {
            if (err) {
              return reject({ error: "Erro ao cadastrar os dados: " + err })
            }
            resolve({ success: "Cadastrado com sucesso!" });
          })
        });
      }
    })
  }

  ///Get All
  GetAll() {
    return new Promise((resolve, reject) => {
      DB.all("SELECT * FROM admin ORDER BY admin.id DESC", (err, data) => {
        if (err) {
          return reject({ error: "Erro ao obter os dados da tabela: " + err })
        }
        if (data?.length === 0) {
          return resolve({ error: "Sem registros..." })
        }
        resolve({ success: data })
      });
    })
  }

  GetById(id){
    return new Promise((resolve, reject) => {
      DB.all("SELECT * FROM admin WHERE admin.id = ? ", [id], (err, data) => {
        if (err) {
          return reject({ error: "Erro ao obter os dados da tabela: " + err })
        }
        if (data?.length === 0) {
          return resolve({ error: "Sem registros..." })
        }
        resolve({ success: data })
      });
    })
  }

  SearchUser(data){
    this.like = `%${data}%`
    return new Promise((resolve, reject) => {
      DB.all("SELECT * FROM admin WHERE admin.username like ? ", [this.like], (err, data) => {
        if (err) {
          return reject({ error: "Erro ao obter os dados da tabela: " + err })
        }
        if (data?.length === 0) {
          return resolve({ error: "Nenhum registro encontrado..." })
        }
        resolve({ success: data })
      });
    })
  }

  Login(data) {
    return new Promise((resolve, reject) => {
      const { username, password } = data;
      if (username && password) {
        DB.get("SELECT * FROM admin WHERE admin.username = ? ", username, (err, data) => {
          if (err) {
            return reject({ error: "Erro ao colsultar o admin: " + err });
          }
          if (!data) {
            return resolve({ error: "Usuário ou senha incorrectos!" })
          }
          if (data.password === null) {
            return resolve({ error: "Usuário não possue a senha!" })
          }
          resolve({ success: data });
        });
      }
    })
  }


  DeleteUser(id) {
    return new Promise((resolve, reject) => {
      if (id) {
        DB.get("SELECT * FROM admin WHERE id = ?", [id], (err, data) => {
          if (err) {
            return reject({ error: err })
          }
          if (!data) {
            return resolve({ error: "Erro ao localizr os dados!" })
          }
          this.query = "DELETE FROM admin WHERE admin.id = ?";
          DB.run(this.query, [id], (err) => {
            if (err) {
              return reject({ error: err })
            }
            resolve({ success: "Dados eliminados com sucesso!" });
          })
        })
      }
    })
  }

  SetPassword(data) {
    const { id, password } = data;
    return new Promise((resolve, reject) => {
      DB.get("SELECT * FROM admin WHERE id = ?", [id], (err, result) => {
        if (err) {
          return reject({ error: "Erro ao buscar os dados: " + err });
        }
        if (!result) {
          return reject({ error: "Administrador não encontrado!" });
        }
        if (result.password !== null) {
          return resolve({ error: "Você já possui uma senha!" });
        }
  
        this.query = "UPDATE admin SET password = ? WHERE id = ?";
        DB.run(this.query, [password, id], (err) => {
          if (err) {
            return reject({ error: "Erro ao adicionar a senha" });
          }
          resolve({ success: "Senha adicionada com sucesso!" });
        });
      });
    });
  }  


}
export default new UserModel;
