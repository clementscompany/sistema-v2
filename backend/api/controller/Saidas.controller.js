import SaidasModel from "../../database/models/Saidas.Model.js";

class Controller{
  async GetAll(req, res){
    try {
      const data = await SaidasModel.GetAll();
      res.status(200).json({saidas:data});
    } catch (error) {
      res.status(500).json({error:"Erro ao ober os dados da tabela " + error.error});
    }
  }

  async GetBy(req, res){
    try {
      const data = await SaidasModel.ListBy(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({error:"Erro ao ober os dados da tabela " + error.error});
    }
  }

  async Search(req, res){
    try {
      const data = await SaidasModel.Search(req.params.data);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({error:"Erro na pesauisa" + error.error});
    }
  }

  async Update(req, res){
    try {
      const data = await SaidasModel.Update(req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({error:"Erro ao atualizar os dados" + error.error});
    }
  }

  async Post(req, res){
    try {
      const data = await SaidasModel.Post(req.body);
      res.status(200).json(data);
      res.status(200).json(req.body);
    } catch (error) {
      res.status(500).json({error:"Erro ao ober os dados da tabela " + error.error});
    }
  }

  async Delete(req, res){
    try {
      const data = await SaidasModel.Delete(req.body.id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({error:"Erro ao eliminar os dados da tabela " + error.error});
    }
  }
}
export default new Controller;