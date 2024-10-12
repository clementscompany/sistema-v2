import ModelClass from "../../database/models/Model.class.js";

class Controller{
  async GetEntradas(req, res) {
    try {
      const data = await ModelClass.GetAll();
      res.status(200).json({entregas:data});
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter entradas '+error.error });
    }
  }

  async DasBoard(req, res){
    try {
      const data = await ModelClass.DashBoard()
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({error:"Erro so obter os dados"})
    }
  }
  
  async GetEntradasBy(req, res) {
    try {
      const data = await ModelClass.ListBy(req.params.id) 
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({error:"Erro so obter os dados"})
    }
  }
  
  async SearchEntradasBy(req, res) {
    try {
      const data = await ModelClass.Search(req.params.data) 
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({error:"Erro ao obter os dados :"+error.error})
    }
  }

  async PostEntradas(req, res) {
    try {
      const data = await ModelClass.Post(req.body) 
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({error:"Erro ao cadastrar"})
    }
  }

  async PutEntradas(req, res) {
    try {
      const data = await ModelClass.Update(req.body) 
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({error:"Erro ao cadastrar"})
    }
  }

  async DeleteEntradas(req, res) {
    try {
      const data = await ModelClass.Delete(req.body.id) 
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({error:"Erro ao eliminar"})
    }
  }
}
export default new Controller();