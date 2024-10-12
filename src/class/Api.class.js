import { API_URL } from "../../backend/config/env.js";
import MiniSpinner from "../Components/MiniSpinner.js";
import LoadingClass from "../hooks/Loading.js";
import { Navigate, Route } from "../Routes.js";
class Api {
  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{Entregas}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  // UpdateEntregas
  async UpdateEntregas(mainContainer, form, id) {
    this.text = form.querySelector(".textError");
    LoadingClass.FormLoading(this.text);
    this.inputs = form.querySelectorAll(".input");
    this.data = {};
    this.inputs.forEach(input => {
      this.data[input.name] = input.value;
    });
    this.data.id = id;

    try {
      const postData = await fetch(`${API_URL}/entregas`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        cache: "no-cache",
        body: JSON.stringify(this.data)
      });
      if (!postData.ok) {
        LoadingClass.FormMessage(this.text, "Erro: " + postData.statusText, "error");
        return;
      }
      this.response = await postData.json();
      const { success, error } = this.response;
      if (error) {
        LoadingClass.FormMessage(this.text, error, "error");
        return;
      }
      LoadingClass.FormMessage(this.text, success, "succes");
    } catch (error) {
      LoadingClass.FormMessage(this.text, "Erro: " + error, "error");
    }
  }
  // POST ENTREGAS / SAIDAS
  async PostEntregas(mainContainer, form) {
    this.text = form.querySelector(".textError");
    LoadingClass.FormLoading(this.text);
    this.inputs = form.querySelectorAll(".input");
    this.data = {};
    this.inputs.forEach(input => {
      this.data[input.name] = input.value;
    });
    try {
      const postData = await fetch(`${API_URL}/entregas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        cache: "no-cache",
        body: JSON.stringify(this.data)
      });
      if (!postData.ok) {
        LoadingClass.FormMessage(this.text, "Erro: " + postData.statusText, "error");
        return;
      }
      this.response = await postData.json();
      const { success, error } = this.response;
      if (error) {
        LoadingClass.FormMessage(this.text, error, "error");
        return;
      }
      LoadingClass.FormMessage(this.text, success, "succes");
    } catch (error) {
      LoadingClass.FormMessage(this.text, "Erro: " + error, "error");
    }
  }

  // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  // Data Entregas
  async DeleteDataEntregas(mainContainer, id) {
    LoadingClass.Loading(mainContainer);
    try {
      const get = await fetch(`${API_URL}/entregas`, {
        method: "DELETE", headers: {
          "Content-Type": "application/json"
        }, body: JSON.stringify({ id: id })
      });
      if (!get.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await get.json();
      if (this.data.error) {
        LoadingClass.SetErrorMessagePopUp(mainContainer, this.data?.error, "error");
        return;
      }
      LoadingClass.SetErrorMessagePopUp(mainContainer, this.data?.success, "sucess");
      return true;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  // Data Entregas
  async SearchEntregas(mainContainer, data) {
    LoadingClass.Loading(mainContainer);
    try {
      const get = await fetch(`${API_URL}/entregas/search/${data}`, { method: "GET" });
      if (!get.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await get.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  // Data Entregas
  async GetDataEntregas(mainContainer) {
    LoadingClass.Loading(mainContainer);
    try {
      const get = await fetch(`${API_URL}/entregas`, { method: "GET" });
      if (!get.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await get.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  // Data Entregas
  async GetDataEntregasBy(mainContainer, id) {
    LoadingClass.Loading(mainContainer);
    try {
      const get = await fetch(`${API_URL}/entregas/${id}`, { method: "GET" });
      if (!get.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText);
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await get.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  ////Data Home 
  async GetAllDataMome(mainContainer) {
    LoadingClass.Loading(mainContainer);
    try {
      const get = await fetch(`${API_URL}/produtos`, { method: "GET" });
      if (!get.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await get.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  // Get produtos
  async GetAllDataMomeBy(mainContainer, id) {
    LoadingClass.Loading(mainContainer);
    try {
      const getby = await fetch(`${API_URL}/produtos/${id}`, { method: "GET" });
      if (!getby.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await getby.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  //Get Produtos 
  async GetProdutos(mainContainer) {
    LoadingClass.Loading(mainContainer);
    try {
      const getby = await fetch(`${API_URL}/produtos`, { method: "GET" });
      if (!getby.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await getby.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  async GetProdutosBy(mainContainer, id) {
    LoadingClass.Loading(mainContainer);
    try {
      const getby = await fetch(`${API_URL}/produtos/${id}`, { method: "GET" });
      if (!getby.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await getby.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

   //Get Produtos 
   async SearchProdutos(mainContainer, data) {
    LoadingClass.Loading(mainContainer);
    try {
      const getby = await fetch(`${API_URL}/produtos/search/${data}`, { method: "GET" });
      if (!getby.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await getby.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }


  // ((((((((((((((((((((((((((((((((((((((((((((((((((((("Emtradas")))))))))))))))))))))))))))))))))))))))))))))))))))))
  // get Entradas 
  async GetEntradas(mainContainer) {
    LoadingClass.Loading(mainContainer);
    try {
      const getby = await fetch(`${API_URL}/entradas`, { method: "GET" });
      if (!getby.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await getby.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  async SearchEntradas(mainContainer, data) {
    LoadingClass.Loading(mainContainer);
    try {
      const getby = await fetch(`${API_URL}/entradas/search/${data}`, { method: "GET" });
      if (!getby.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await getby.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  async GetEntradasById(mainContainer, id) {
    LoadingClass.Loading(mainContainer);
    try {
      const getby = await fetch(`${API_URL}/entradas/${id}`, { method: "GET" });
      if (!getby.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await getby.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  async DeleteDataEntradas(mainContainer, id) {
    LoadingClass.Loading(mainContainer);
    try {
      const get = await fetch(`${API_URL}/entradas`, {
        method: "DELETE", headers: {
          "Content-Type": "application/json"
        }, body: JSON.stringify({ id: id })
      });
      if (!get.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await get.json();
      if (this.data.error) {
        LoadingClass.SetErrorMessagePopUp(mainContainer, this.data?.error, "error");
        return;
      }
      LoadingClass.SetErrorMessagePopUp(mainContainer, this.data?.success, "sucess");
      return true;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  // POST ENTRADAS / SAIDAS
  async PostEntradas(mainContainer, form) {
    this.text = form.querySelector(".textError");
    LoadingClass.FormLoading(this.text);
    this.inputs = form.querySelectorAll(".input");
    this.data = {};
    this.inputs.forEach(input => {
      this.data[input.name] = input.value;
    });
    
    try {
      const postData = await fetch(`${API_URL}/entradas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        cache: "no-cache",
        body: JSON.stringify(this.data)
      });
      if (!postData.ok) {
        LoadingClass.FormMessage(this.text, "Erro: " + postData.statusText, "error");
        return;
      }
      this.response = await postData.json();
      const { success, error } = this.response;
      if (error) {
        LoadingClass.FormMessage(this.text, error, "error");
        return;
      }
      LoadingClass.FormMessage(this.text, success, "succes");
    } catch (error) {
      LoadingClass.FormMessage(this.text, "Erro: " + error, "error");
    }
  }

  // UPDATE / ENTRADAS
  async UpdateEntradas(mainContainer, form, id) {
    this.text = form.querySelector(".textError");
    LoadingClass.FormLoading(this.text);
    this.inputs = form.querySelectorAll(".input");
    this.data = {};
    this.inputs.forEach(input => {
      this.data[input.name] = input.value;
    });
    this.data.id = parseInt(id);
    try {
      const postData = await fetch(`${API_URL}/entradas`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        cache: "no-cache",
        body: JSON.stringify(this.data)
      });
      if (!postData.ok) {
        LoadingClass.FormMessage(this.text, "Erro: " + postData.statusText, "error");
        return;
      }
      this.response = await postData.json();
      
      const { success, error } = this.response;
      if (error) {
        LoadingClass.FormMessage(this.text, error, "error");
        return;
      }
      LoadingClass.FormMessage(this.text, success, "succes");
    } catch (error) {
      LoadingClass.FormMessage(this.text, "Erro: " + error, "error");
    }
  }

  // ((((((((((((((((((((((((produtos))))))))))))))))))))))))
  // UPDATE / PRODUTOS / POST
  async PostProdutos(mainContainer, form) {
    this.text = form.querySelector(".textError");
    LoadingClass.FormLoading(this.text);
    this.inputs = form.querySelectorAll(".input");
    this.data = {};
    this.inputs.forEach(input => {
      this.data[input.name] = input.value;
    });
    try {
      const postData = await fetch(`${API_URL}/produtos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        cache: "no-cache",
        body: JSON.stringify(this.data)
      });
      if (!postData.ok) {
        LoadingClass.FormMessage(this.text, "Erro: " + postData.statusText, "error");
        return;
      }
      this.response = await postData.json();
      
      const { success, error } = this.response;
      if (error) {
        LoadingClass.FormMessage(this.text, error, "error");
        return;
      }
      LoadingClass.FormMessage(this.text, success, "succes");
    } catch (error) {
      LoadingClass.FormMessage(this.text, "Erro: " + error, "error");
    }
  }

  async UpdateProdutos(mainContainer, form, id) {
    this.text = form.querySelector(".textError");
    LoadingClass.FormLoading(this.text);
    this.inputs = form.querySelectorAll(".input");
    this.data = {};
    this.inputs.forEach(input => {
      this.data[input.name] = input.value;
    });
    this.data.id = id;
    try {
      const postData = await fetch(`${API_URL}/produtos`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        cache: "no-cache",
        body: JSON.stringify(this.data)
      });
      if (!postData.ok) {
        LoadingClass.FormMessage(this.text, "Erro: " + postData.statusText, "error");
        return;
      }
      this.response = await postData.json();
      
      const { success, error } = this.response;
      if (error) {
        LoadingClass.FormMessage(this.text, error, "error");
        return;
      }
      LoadingClass.FormMessage(this.text, success, "succes");
    } catch (error) {
      LoadingClass.FormMessage(this.text, "Erro: " + error, "error");
    }
  }

  async DeleteProdutos(mainContainer, id){
    LoadingClass.RemoveModal(mainContainer);
    LoadingClass.Loading(mainContainer);
    try {
      this.fetchDelete  = await fetch(`${API_URL}/produtos`, {
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({id:id})
      });
      if(!this.fetchDelete.ok){
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao eliminar os dados: " + this.fetchDelete.statusText);
        return;
      }

      this.data = await this.fetchDelete.json();
      const { success, error } = this.data;
      if (error) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorMessagePopUp(mainContainer,error, "error");
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      LoadingClass.SetErrorMessagePopUp(mainContainer, success, "success");

    } catch (error) {
      LoadingClass.RemoveModal(mainContainer);
      LoadingClass.SetErrorMessagePopUp(mainContainer,"Erro:" + error, "error");
    }
  }

  // ((((((((((((((((((((((((((((((((((LOGIN API))))))))))))))))))))))))))))))))))
  async SigIn(form){  
    try {
      this.inputs = form.querySelectorAll(".input-field");
      this.text = form.querySelector(".textError");
      this.data = {};
      this.inputs.forEach(input=>{ this.data[input.name] = input.value });
      this.sendData = await fetch(`${API_URL}/auth/login/sign`, 
        { 
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(this.data)
        });
      if (!this.sendData.ok) {
        LoadingClass.FormMessage(this.text, "Erro: "+this.sendData.statusText, "error");
        return;
      }
      this.response = await this.sendData.json();
      const {success, token , error} = this.response;
      if (error) {
        LoadingClass.FormMessage(this.text, error, "error");
        return;
      }
      LoadingClass.FormMessage(this.text, success, "sucess");
      sessionStorage.setItem("session_token", token);

      setTimeout(()=>{
        LoadingClass.FormLoading(this.text);
        this.navigate();
      },1000);

      this.navigate = ()=>{
        setTimeout(()=>{
        this.navigate = Navigate("/dashboard");
        Route();
      },1000);}
    } catch (error) {
      LoadingClass.FormMessage(this.text, "Erro:"+error, "error");
    }
  }


  async PutPassword(id, form){  
    try {
      this.inputs = form.querySelectorAll(".input-field");
      this.text = form.querySelector(".textError");
      this.data = {};
      this.inputs.forEach((input)=>{
        this.data[input.name] = input.value;
      })
      this.data.id = id;
      this.json = JSON.stringify(this.data);
      this.sendData = await fetch(`${API_URL}/auth/login/register`, {method:"PUT", body:this.json, 
        headers:{
          "Content-Type":"application/json"
        }
      });
      if (!this.sendData.ok) {
        LoadingClass.FormMessage(this.text, this.sendData.statusText, "error");
        return;
      }
      this.response = await this.sendData.json();
      const {success, error} = this.response;
      if (error) {
        LoadingClass.FormMessage(this.text, error, "error");
        return;
      }
      LoadingClass.FormMessage(this.text, success, "sucess");
    } catch (error) {
      LoadingClass.FormMessage(this.text, error, "error");
    }
  }
  
  async ListAllUsers(mainContainer){
    LoadingClass.Loading(mainContainer);
    try {
      const get = await fetch(`${API_URL}/auth/admin/admin`, { method: "GET" });
      if (!get.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await get.json();
      return this.data;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

  async RegisterUser(form){
    this.text = form.querySelector(".textError");
    this.input = form.querySelector(".input-field");
    this.data = {};
    this.data[this.input.name] = this.input.value;
    try {
      const sendData = await fetch(`${API_URL}/auth/login/register`, {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(this.data)
      });
      if (!sendData.ok) {
        LoadingClass.FormMessage(this.text, "Erro: "+sendData.statusText, "error")
        return;
      }
      this.response = await sendData.json();
      if (this.response?.error) {
        LoadingClass.FormMessage(this.text, this.response?.error, "error");
        return;
      }
      LoadingClass.FormMessage(this.text, this.response?.success, "sucess");
    } catch (error) {
      LoadingClass.FormMessage(this.text, "Erro: "+error, "error");
    }
  }

  async SearchUsers(element, data){
    LoadingClass.FormLoading(element);
    try {
      const get = await fetch(`${API_URL}/auth/admin/search/${data}`, { method: "GET" });
      if (!get.ok) {
        LoadingClass.FormMessage(element, "Erro: "+get.statusText, "error");
        return;
      }
      this.data = await get.json();
      return this.data;
    } catch (error) { LoadingClass.FormMessage(mainContainer, "Erro ao obter os dados: " + error, "error") }
  }


  async DeleteUser(mainContainer, id) {
    LoadingClass.RemoveModal(mainContainer);
    LoadingClass.Loading(mainContainer);    
    const token = sessionStorage.getItem("session_token");
    try {
      const get = await fetch(`${API_URL}/auth/admin/admin`, {
        method: "DELETE", headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }, body: JSON.stringify({ id: id })
      });
      if (!get.ok) {
        LoadingClass.RemoveModal(mainContainer);
        LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados" + get.statusText)
        return;
      }
      LoadingClass.RemoveModal(mainContainer);
      this.data = await get.json();      
      if (this.data.error) {
        LoadingClass.SetErrorMessagePopUp(mainContainer, this.data?.error, "error");
        return;
      }
      LoadingClass.SetErrorMessagePopUp(mainContainer, this.data?.success, "sucess");
      return true;
    } catch (error) { LoadingClass.SetErrorPopUp(mainContainer, "Erro ao obter os dados: " + error) }
  }

}
export default new Api();
