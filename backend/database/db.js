import sqlite3 from "sqlite3";
export const DB = new sqlite3.Database("db.db");

const CreateTable = () => {

  const entregas = `
    CREATE TABLE IF NOT EXISTS entregas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data DATE NULL DEFAULT CURRENT_TIMESTAMP,
      marca VARCHAR(244) NOT NULL,
      matricula VARCHAR(244) NOT NULL,
      motorista VARCHAR(244) NOT NULL,
      entregou VARCHAR(244) NOT NULL,
      recebeu VARCHAR(244) NOT NULL,
      quantidade INTEGER,
      descricao TEXT,
      produto_id INTEGER,
      preco DECIMAL(10, 2),
      FOREIGN KEY (produto_id) REFERENCES produtos(id)
    )
   `;

  DB.run(entregas, (err) => {
    if (err) {
      console.error("Erro ao criar tabela entregas:", err.message);
    }
  });

  const entradas = `
    CREATE TABLE IF NOT EXISTS entradas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data DATE NULL DEFAULT CURRENT_TIMESTAMP,
      marca VARCHAR(244) NOT NULL,
      matricula VARCHAR(244) NOT NULL,
      motorista VARCHAR(244) NOT NULL,
      entregou VARCHAR(244) NOT NULL,
      recebeu VARCHAR(244) NOT NULL,
      quantidade INTEGER,
      descricao TEXT,
      produto_id INTEGER,
      preco DECIMAL(10, 2),
      FOREIGN KEY (produto_id) REFERENCES produtos(id)
    )
  `;
  
  DB.run(entradas, (err) => {
    if (err) {
      console.error("Erro ao criar tabela entradas:", err.message);
    } 
  });

  const produtos = `
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome VARCHAR(244) NOT NULL,
      descricao TEXT,
      preco DECIMAL(10, 2) NOT NULL,
      quantidade INTEGER NOT NULL,
      data_adicao DATE NULL DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const admin = `
  CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR(244) NOT NULL,
      password VARCHAR(244) NULL DEFAULT NULL,
      data_adicao DATE NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

  DB.run(admin, (err)=>{
    if (err) {
      console.error("Erro ao criar a tabela admin");
      return;
    }
    baseAdmin();
  })
  const baseAdmin = () => {
    DB.all("SELECT * FROM admin", (err, data) => {
      if (err) {
        console.log("Erro na criação da tabela admin: " + err);
        return;
      }
      if (data.length === 0) {
        const query = "INSERT INTO admin (username) VALUES ('admin')"; 
        DB.run(query, (err) => {
          if (err) {
            console.log("Erro ao criar a entrada na tabela admin: " + err);
          }
        });
      }
    });
  };  
  DB.run(produtos, (err) => {
    if (err) {
      console.error("Erro ao criar tabela produtos:", err.message);
    } 
  });

};
CreateTable();


