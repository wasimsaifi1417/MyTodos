import { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { CiSaveUp1 } from "react-icons/ci";
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import { v4 as uuidv4 } from 'uuid';

import './App.css'



function App() {

  const [ todo, settodo ] = useState("");
  const [todos, settodos] = useState([]);
  const [showFinished , setshowFinished] = useState(false);

  useEffect(()=>{
    let len = localStorage.getItem("todos")

    if(len){
      let todos = JSON.parse(localStorage.getItem("todos"))

      settodos(todos)
    }

  },[])

  const saveToLS = ()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  const handleEdit = (e,id) => {
    let t = todos.filter(i=>i.id===id)
    settodo(t[0].todo)
     let newTodos = todos.filter((w)=>{
        return w.id !== id
      })
  
      settodos(newTodos);
      saveToLS()
  }

  const handleDelete = (e , id) => {

    let a = confirm("Are you sure You want to delete this todo");
    if(a){

      let newTodos = todos.filter((w)=>{
        return w.id !== id
      })
  
      settodos(newTodos);
      saveToLS();
    }else{
      settodos(todos);
    }

  }

  const handleAdd = () => {
    settodos([...todos, { todo, isCompleted: false , id:uuidv4()}]);
    settodo("");
    saveToLS();
  }

  const handleChange = (e) => {
    settodo(e.target.value);
  }

  const handeleCheckbox = (e)=>{
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id === id
    })

    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    
    settodos(newtodos);
    saveToLS();
  }

  const handleToggle = ()=>{
      setshowFinished(!showFinished);
  }


  return (
    <>
      <Navbar />
      <div className='container bg-gray-800 mx-auto md:w-1/2 text-white min-h-[80vh] m-4 '>
        <div className="todo flex flex-col gap-4 items-center p-4">
          <input onChange={handleChange}  value={todo} className='bg-slate-700 p-2 w-1/2 rounded-3xl border-amber-200' type="text" />
          <button onClick={handleAdd} disabled = {todo.length<3} className='border-2 w-1/3 border-white rounded-2xl p-2 bg-blue-700'>Save
</button>

        </div>
        <div>
          <input className='m-2' onChange={handleToggle} type="checkbox" checked = {showFinished} /> Show Finished
        </div>
        <div className="todos">
            {todos.length ===0 && <div className='m-5'>No Todos to display</div> }
          {todos.map(items=> {

            return  (showFinished || !items.isCompleted) && <div key={items.id} className="todo flex gap-4 p-4 border-t border-white content-between">
          
              <input onChange={handeleCheckbox} name={items.id} value={items.isCompleted} className='' type="checkbox" />
              <div className={items.isCompleted? "line-through":""}>{items.todo}</div>
              <button className='border-2 border-white rounded-2xl p-2 bg-blue-700' onClick={(e)=>{handleEdit(e,items.id)}} ><FaEdit /></button>
              <button className='border-2 border-white rounded-2xl p-2 bg-blue-700' onClick={(e)=>{handleDelete(e,items.id)}} ><MdDeleteForever /></button>
            </div>


          })

          }

        </div>


      </div>

      <Footer/>
    </>
  )
}

export default App
