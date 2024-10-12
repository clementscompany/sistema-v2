import ProdutosModel from "../../database/models/Produtos.Model.js";
class Controller{
  async GetAll(req, res){
    try {
      const data = await ProdutosModel.Listar();
      const dashboard = await ProdutosModel.DashBoard();
      res.status(200).json({produtos:data, estsatistic:dashboard})
    } catch (error) {
      res.status(200).json({error:"Erro ao obter os dados: "+error.error })
    }
  }

  async GetBy(req, res){
    try {
      const data = await ProdutosModel.ListarBy(req.params.id);
      res.status(200).json({produtos:data})
    } catch (error) {
      res.status(200).json({error:"Erro ao obter os dados: "+error.error })
    }
  }

  async Search(req, res){
    try {
      const data = await ProdutosModel.Pesquisar(req.params.data);
      res.status(200).json({produtos:data})
    } catch (error) {
      res.status(200).json({error:"Erro ao obter os dados: "+error.error })
    }
  }

  async Postar(req, res){
    try {
      const data = await ProdutosModel.Cadastrar(req.body);
      res.status(200).json(data)
    } catch (error) {
      res.status(200).json({error:"Erro ao cadastrar os dados: "+ error.error })
    }
  }

  async Update(req, res){
    try {
      const data = await ProdutosModel.Editar(req.body);
      res.status(200).json(data)
    } catch (error) {
      res.status(200).json({error:"Erro ao cadastrar os dados: "+ error.error })
    }
  }

  async Delete(req, res){
    try {
      const data = await ProdutosModel.Deletar(req.body.id);
      res.status(200).json(data)
    } catch (error) {
      res.status(200).json({error:"Erro ao cadastrar os dados: "+ error.error })
    }
  }
}
export default new Controller();

