import { DB } from "../db.js"

class EntradasModel {
  constructor(){
    this.date = new Date().getFullYear()+"-"+ (new Date().getMonth() + 1)+"-"+ new Date().getUTCDate();
  }
  GetAll() {
    return new Promise((resolve, reject) => {
      DB.all("SELECT * FROM entradas ORDER BY entradas.id DESC", (err, data) => {
        if (err) {
          reject({ error: err.message });
        }
        if (data?.length === 0) {
          resolve({ error: "Sem registros..." });
        }
        resolve({ success: data });
      });
    });
  }

  ListBy(id) {
    return new Promise((resolve, reject) => {
      this.sql = DB.get(`
        SELECT 
        ent.id,
        ent.data,
        ent.marca,
        ent.matricula,
        ent.motorista,
        ent.entregou,
        ent.recebeu,
        ent.quantidade,
        ent.descricao,
        ent.produto_id, 
        ent.preco,
        pd.nome AS produto,
        pd.descricao AS descProd,
        pd.preco AS precoProd,
        pd.quantidade AS stockAtualProd

        FROM entradas AS ent INNER JOIN produtos as pd
        ON ent.produto_id = pd.id
        WHERE ent.id = ?
        
        `, id, (err, data) => {
        if (err) {
          return reject({ error: err.message });
        }
        if (!data) {
          return resolve({ error: "Registro não encontrado" });
        }
        resolve({ success: data });
      });
    });
  }

  Search(data) {
    return new Promise((resolve, reject) => {
      this.like = `%${data}%`;
      this.query = DB.all(
        'SELECT * FROM entradas WHERE data LIKE ? OR marca LIKE ? OR matricula LIKE ? OR motorista LIKE ? OR entregou LIKE ? OR recebeu LIKE ?',
        [this.like, this.like, this.like, this.like, this.like, this.like],
        (err, results) => {
          if (err) {
            return reject({ error: err.message });
          }
          if (results.length === 0) {
            return resolve({ error: "Registro não encontrado!" });
          }
          resolve({ success: results });
        }
      );
    });
  }

  Post(data) {
    return new Promise((resolve, reject) => {
      DB.all(
        'SELECT * FROM entradas WHERE (marca = ? AND matricula = ?) AND (motorista = ? AND entregou = ? AND recebeu = ?)',
        [
          data.marca,
          data.matricula,
          data.motorista,
          data.entregou,
          data.recebeu
        ],
        (err, rows) => {
          if (err) {
            return reject({ error: "Erro ao consultar o banco de dados", details: err });
          }
          if (rows.length > 0) {
            return resolve({ error: 'Estes dados já foram cadastrados!' });
          }

          const stmt = DB.prepare(
            'INSERT INTO entradas (marca, matricula, motorista, entregou, recebeu, quantidade, descricao, produto_id, preco) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
          );

          stmt.run(
            data.marca,
            data.matricula,
            data.motorista,
            data.entregou,
            data.recebeu,
            data.quantidade,
            data.descricao,
            data.produto_id,
            data.preco,
            function (err) {
              if (err) {
                return reject({ error: "Erro ao cadastrar os dados!", details: err });
              }

              const update = DB.prepare(`UPDATE produtos SET quantidade = quantidade + ? WHERE id = ?`);
              update.run(
                data.quantidade,
                data.produto_id,
                function (err) {
                  if (err) {
                    return reject({ error: "Erro ao atualizar a quantidade do produto!", details: err });
                  }
                  resolve({ success: "Cadastrado com sucesso!" });
                }
              );
            }
          );
        }
      );
    });
  }

  Update(data) {
    return new Promise((resolve, reject) => {
      const query = DB.prepare(
        'UPDATE entradas SET marca = ?, matricula = ?, motorista = ?, entregou = ?, recebeu = ?, quantidade = ?, descricao = ?, produto_id = ?, preco = ? WHERE entradas.id = ?'
      );

      query.run(
        data.marca,
        data.matricula,
        data.motorista,
        data.entregou,
        data.recebeu,
        data.quantidade,
        data.descricao,
        data.produto_id,
        data.preco,
        data.id,
        function (err) {
          if (err) {
            return reject({ error: 'Erro ao atualizar os dados', details: err });
          }
          resolve({ success: "Dados atualizados com sucesso!" });
        }
      );
    });
  }


  Delete(id) {
    return new Promise((resolve, reject) => {
      DB.all("SELECT * FROM entradas WHERE entradas.id = ?", [id], (err, data) => {
        if (err) {
          return reject({ error: err });
        }
        if (data.length === 0) {
          return resolve({ error: "Erro ao eliminar os dados!" });
        }

        this.query = DB.prepare('DELETE FROM entradas WHERE entradas.id = ?');
        this.query.run(id, function (err) {
          if (err) {
            return reject({ error: 'Erro inesperado', details: err });
          }
          resolve({ success: "Registro eliminado com sucesso!" });
        });
      });
    });
  }
}

export default new EntradasModel();
