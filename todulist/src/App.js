import { useState } from 'react';
import './App.css';
import Alert from './componets/Alert';
import List from './componets/List';
function App() {
   const [name,setName]=useState('')
   const [list,setList]=useState([])
   const [isEditing,setIdEditing]=useState(false)
   const [editID,setEditID]=useState(null)
   const [alert,setAlert]=useState({show:false,mag:"",type:""})

   const handleSubmit=(e)=>{
    e.preventDefault()
    if(!name){
      showAlert(true,"danger","Plese Enter Your value");
    }else if(name && isEditing){
       setList(
        list.map((item)=>{
          if(item.id===editID){
            return{...item,title:name}
          }
          return item
        })
       )
       setName('');
       setEditID(null);
       setIdEditing(false);
       showAlert(true,"seccess","values change");

    }else{
      showAlert(true,"success","item added to the list")
      const newItem={id: new Date().getTime().toString(),title:name};
      setList([...list,newItem])
      setName("");
    }
   }
   const showAlert=(show=false,type="",msg="")=>{
    setAlert({show,type,msg})
   } 
   const removeItem=(id)=>{
        showAlert(true,'danger',"item remove")
        setList(list.filter((item)=>item.id!==id));
   }
   const editItem=(id)=>{
    
    const editItem=list.find((item)=>item.id===id

    )
    
    setIdEditing(true);
    setEditID(id);
    setName(editItem.name)
    
   }
   const clearList=()=>{
    showAlert(true,"danger","Empty List");
    setName("")
    setList([])
   }
  return (

    <section className="section-center">
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3 style={{marginBottom:"1.5rem", textAlign:"center"}}>
          TODU LIST USING LOCAL STORAGE
        </h3>
        <div className='mb-3 form'>
          <input type="text" className='form-control me-2' placeholder='e.g bread milk etc..' onChange={(e)=>setName(e.target.value) } value={name} />
          <button type='submit' className='btn btn-success'>{isEditing ? "EDIT" :"SUBMIT"}</button>
        </div>
      </form>
      {/* {list.lenght > 0 && ( */}
        <div style={{marginTop:"2rem"}}>
          <List items={list} removeItem={removeItem} editItem={editItem}/>
          <div className="text-center mt-3">
            <button className='btn btn-warning' onClick={clearList}>Clear List</button>
          </div>
        </div>
      
      
    </section>
    
  );
}

export default App;
 