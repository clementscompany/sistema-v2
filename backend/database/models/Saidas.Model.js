import { DB } from "../db.js";

class SaidasModel{
  GetAll() {
    return new Promise((resolve, reject) => {
      DB.all("SELECT * FROM entregas ORDER BY entregas.id DESC", (err, data) => {
        if (err) {
          reject({ error: err.message });
        } 
         if (data?.length === 0) {
          resolve({ error: "Sem registros..." });
        }   
        resolve({ sucess: data });
      });
    });
  }

  ListBy(id) {
    return new Promise((resolve, reject)=>{
     this.sql = DB.all("SELECT * FROM entregas WHERE id = ?", id, (err, data)=>{
       if (err) {
         return reject({error:err.message})
       }
       if (data?.length === 0) {
         resolve({error:"Registro nao encontrado"})
       }
       resolve({sucess:data})
     })
    })
  }

  Search(data) {
    return new Promise((resolve, reject) => {
      this.like = `%${data}%`;
      this.query = DB.all(
        'SELECT * FROM entregas WHERE entregas.data LIKE ? OR entregas.marca LIKE ? OR entregas.matricula LIKE ? OR entregas.motorista LIKE ? OR entregas.entregou LIKE ? OR entregas.recebeu LIKE ?',
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
  

  Update(data) {
    return new Promise((resolve, reject)=>{
      this.query = DB.prepare(
        'UPDATE entregas SET data = ?, marca = ?, matricula = ? ,motorista = ? ,entregou = ?,recebeu = ? WHERE entregas.id = ?'
      );
      this.result = this.query.run(
        data.data,
        data.marca,
        data.matricula,
        data.motorista,
        data.entregou,
        data.recebeu,
        data.id
      )
      if (!this.result) {
        return reject({ error: 'Erro ao atualizar os dados' });
      } else{
        resolve({sucess:"Dados atualizados com sucesso",})
      }
    })
  }

  Post(data) {
    return new Promise((resolve, reject) => {
      DB.all(
        'SELECT * FROM entregas WHERE marca = ? AND matricula = ? AND motorista = ? AND entregou = ? AND recebeu = ?',
        [
          data.marca,
          data.matricula,
          data.motorista,
          data.entregou,
          data.recebeu
        ],
        (err, rows) => {
          if (err) {
            return reject({ error: "Erro ao consultar o banco de dados "+ err });
          }
  
          if (rows?.length > 0) {
            resolve({ error: 'Estes dados já foram cadastrados!' });
            return;
          }

          const stmt = DB.prepare(
            'INSERT INTO entregas (marca, matricula, motorista, entregou, recebeu) VALUES (?, ?, ?, ?, ?)'
          );
  
          stmt.run(
            data.marca,
            data.matricula,
            data.motorista,
            data.entregou,
            data.recebeu,
            function (err) {
              if (err) {
                return reject({ error: "Erro ao cadastrar os dados!", details: err });
              }
              resolve({ success: "Cadastrado com sucesso!" });
            }
          );
        }
      );
    });
  }

  Delete(id){
    return new Promise((resolve, reject)=>{
     DB.all("SELECT * FROM entregas WHERE entregas.id = ?", [id], (err, data)=>{
       if (err) {
         return reject({error:err})
       }
       if (data.length === 0) {
         return resolve({error:"Erro ao eliminar os dados!"})
       }
 
       this.query = DB.prepare('DELETE FROM entregas WHERE entregas.id = ?')
       this.result = this.query.run(id)
       
       if (!this.result) {
         return reject({ error: 'Erro inesperado' })
       }
       resolve({ sucess: "Registro eliminado com sucesso!"})
      })
 
     })
   }

}
export default new SaidasModel;