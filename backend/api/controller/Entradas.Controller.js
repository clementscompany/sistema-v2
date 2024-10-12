import EntradasModel from "../../database/models/Entradas.Model.js";

class EntradasController {
  
  async GetAll(req, res) {
    try {
      const data = await EntradasModel.GetAll();
      res.status(200).json({ entradas: data });
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter os dados da tabela: " + error.error });
    }
  }

  async GetBy(req, res) {
    try {
      const data = await EntradasModel.ListBy(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter os dados da tabela: " + error.error });
    }
  }

  async Search(req, res) {
    try {
      const data = await EntradasModel.Search(req.params.data);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro na pesquisa: " + error.error });
    }
  }

  async Update(req, res) {
    try {
      const data = await EntradasModel.Update(req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar os dados: " + error.error });
    }
  }

  async Post(req, res) {
    try {
      const data = await EntradasModel.Post(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro ao adicionar o registro: " + error.error });
    }
  }

  async Delete(req, res) {
    try {
      const data = await EntradasModel.Delete(req.body.id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro ao eliminar os dados da tabela: " + error.error });
    }
  }
}

export default new EntradasController();
