import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';

export default class Doctores extends Component {
    cajaSelectRef = React.createRef();
    cajaInputRef = React.createRef();

    state={
        especialidad:[],
        doctores:[],
        status:false
    }

    cargarEspecialidad=()=>{
        var request ="api/Doctores/Especialidades";
        var url=Global.urlDoctores+request
        axios.get(url).then(res =>{
            this.setState({
                especialidad:res.data,
                status:true 
            })
        })
    }

    cargarDoctores=()=>{
        var datos = this.cajaSelectRef.current.value
        var request="/api/Doctores/DoctoresEspecialidad/"+datos
        var url=Global.urlDoctores+request;
        axios.get(url).then(res=>{
            this.setState({
                doctores:res.data,
                status:true
            })
        })
    }
    aumentarSalario=(e)=>{
        e.preventDefault();
        var datos = this.cajaSelectRef.current.value
        var salario=this.cajaInputRef.current.value
        var request="/api/Doctores/"+datos+"/"+salario
        var url=Global.urlDoctores+request
        console.log(url)

        var salarios={
            salario:salario
        };

        axios.put(url,salarios).then(res=>{
            this.setState({
                mensaje:"Salario subido!!"
            })
        })
    }



    componentDidMount=()=>{
        this.cargarEspecialidad();
    }

  render() {
    return (
      <div>
        <h1>Incremento salarial doctores</h1>
    <form>
        <label>Seleccione una especialidad</label>
        <select onChange={this.cargarDoctores} ref={this.cajaSelectRef}>
            {
                    this.state.especialidad.map((doc,index)=>{
                        return(<option>{doc}</option>)
                    })
                }
        </select><br/>
        <label>Incremento salarial</label><br/>
        <input type={"text"} ref={this.cajaInputRef}></input><br/>
        <button onClick={this.aumentarSalario}>
            Incrementar salarios
        </button>
        <table border={1}>
            <thead>
                <tr>
                    <th>Apellido</th>
                    <th>Especialidad</th>
                    <th>Salario</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.doctores.map((doc,index)=>{
                        return(<tr>
                            <td>{doc.apellido}</td>
                            <td>{doc.especialidad}</td>
                            <td>{doc.salario}</td>
                        </tr>)
                    })
                }
            </tbody>

        </table>
        </form>
      </div>
    )
  }
}
