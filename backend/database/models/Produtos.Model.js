import { DB } from "../db.js";
class Produtos {
  Listar() {
    return new Promise((resolve, reject) => {
      DB.all("SELECT * FROM produtos ORDER BY id DESC", (err, data) => {
        if (err) {
          return reject({ error: err })
        }
        if (data?.length === 0) {
          resolve({ error: "Sem registros..." })
        }
        resolve({ sucess: data })
      });
    })
  }

  DashBoard() {
    return new Promise((resolve, reject) => {
      DB.all(
        `SELECT 
        (SELECT COUNT (*) FROM entregas) AS totalEntregas, 
        (SELECT COUNT (*) FROM entradas) AS totalEntradas,
        (SELECT COUNT (*) FROM produtos) AS totalProdutos,
        (SELECT MAX (quantidade) FROM produtos) AS stockMax,
        (SELECT MIN (quantidade) FROM produtos) AS stockMin,
        (SELECT SUM (quantidade) FROM produtos) AS totalStoque,
        (SELECT SUM (preco) FROM entregas) AS montanteEntregas
        `
        ,
        (err, data) => {
          if (err) {
            return reject({ error: err });
          }
          resolve(data);
        }
      );
    });
  }

  ListarBy(id) {
    return new Promise((resolve, reject) => {
      DB.get("SELECT * FROM produtos WHERE produtos.id = ? LIMIT 1 ", [id], (err, data) => {
        if (err) {
          return reject({ error: err })
        }
        if (!data) {
          resolve({ error: "Registro não encontrado!" });
          return;
        }
        resolve({ sucess: data })
      });
    })
  }

  Pesquisar(data) {
    return new Promise((resolve, reject) => {
      this.like = `%${data}%`;
      DB.all(`SELECT * FROM produtos WHERE id LIKE ?  
        or nome LIKE ? OR descricao LIKE ? `, [this.like, this.like, this.like], (err, data) => {
        if (err) {
          return reject({ error: err })
        }
        if (data?.length === 0) {
          resolve({ error: "Registro não encontrado!" });
        }
        resolve({ sucess: data })
      });
    })
  }

  Deletar(id) {
    return new Promise((resolve, reject) => {
      DB.all("SELECT * FROM produtos WHERE produtos.id = ? LIMIT 1 ", [id], (err, data) => {
        if (err) {
          return reject({ error: err })
        }
        if (data?.length === 0) {
          resolve({ error: "Erro ao eliminar o produto..." });
        }
        this.delete = DB.prepare("DELETE FROM produtos WHERE produtos.id = ?");
        this.delete.run(id, (err) => {
          if (err) {
            reject({ error: err })
          }
          resolve({ success: "Registro eliminado com sucesso!" })
        })
      });
    })
  }

  Editar(data) {
    return new Promise((resolve, reject) => {
      DB.get("SELECT * FROM produtos WHERE id = ? LIMIT 1", [data.id], (err, dados) => {
        if (err) {
          return reject({ error: err });
        }
        if (!dados) {
          return resolve({ error: "Produto não encontrado." });
        }
  
        const updateStmt = DB.prepare(`UPDATE produtos SET nome = ?, descricao = ?, preco = ?, quantidade = ? 
          WHERE id = ?`);
        updateStmt.run(
          data.nome,
          data.descricao,
          data.preco,
          data.quantidade,
          data.id, 
          (err) => {
            if (err) {
              return reject({ error: err });
            }
            resolve({ success: "Registro atualizado com sucesso!" });
          }
        );
      });
    });
  }
  

  Cadastrar(data) {
    return new Promise((resolve, reject) => {
      DB.get(`SELECT * FROM produtos WHERE nome = ? AND descricao = ? AND preco = ? AND quantidade = ?`, 
        [
          data.nome,
          data.descricao,
          data.preco,
          data.quantidade
        ], (err, exist) => {
          if (err) {
            return reject({ error: err });
          }
          if (exist) {
            return resolve({ error: "Este produto já foi cadastrado..." });
          }

          const insertStmt = DB.prepare("INSERT INTO produtos (nome, descricao, preco, quantidade) VALUES (?, ?, ?, ?)");
          insertStmt.run(
            data.nome,
            data.descricao,
            data.preco,
            data.quantidade, 
            function(err) {
              if (err) {
                return reject({ error: err });
              }
              resolve({ success: "Registro cadastrado com sucesso!" });
            }
          );
        });
    });
  }
  
}
export default new Produtos;