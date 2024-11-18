import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'




function App() {

  const [todo, setTodo] = useState(" ")
  const [todos, setTodos] = useState([])
  const [showfinished , setShowfinished] = useState(true)

  useEffect(() => {
    let todoString = JSON.parse(localStorage.getItem("todos"))
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])



  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished=()=>{
      setShowfinished(!showfinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id;

    });

    setTodos(newTodos)
    saveToLS()

  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;

    });

    setTodos(newTodos)
    saveToLS()

  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo(" ")
    console.log(todos)
    saveToLS()

  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    // 
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    console.log(`the id is ${id}`)
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    console.log(newTodos, todos)
    saveToLS()
  }


  return (
    <>
      <Navbar />

      {/* <div className="container mx-auto bg-blue-400 my-4 rounded-xl p-4 min-h-[80vh] w-1/2 "> */}
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%] ">
        <h2>ADD YOUR TODOS</h2>
        <div className="addTodo my-5 ">
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-900 hover:bg-violet-00 hover:font-bold text-white disabled:only:bg-violet-200
        p-1 my-2 rounded-lg hover:text-green-500 w-full '>Add</button>
        </div>

        <input onChange={toggleFinished} type='checkbox' value={showfinished}  />Show Finisihed
        <h2 className='font-bold'>Your Todos</h2>
        {todos.length === 0 && <div>No todos to Display </div>}
        {todos.map(item => {
          return (showfinished || item.isCompleted)&& <div key={item.id} className="todo flex my-3 justify-between">
            <div className='flex gap-5 '>
              <input name={item.id} onChange={handleCheckbox} type='checkbox' checked={item.isCompleted} id=" "/>
              <div className={item.isCompleted ? "line-through " : " "}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full ">
              <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-900 hover:bg-violet-600 hover:font-bold text-white
       mx-1 p-2 py-1  rounded-lg '>Edit</button>
              <button onClick={(e) => { handleDelete(e, itme.id) }} className='bg-violet-900 hover:bg-violet-600 hover:font-bold text-white
       mx-1 p-2 py-1  rounded-lg '>Delete</button>
            </div>
          </div>

        })}


      </div>

    </>
  )
}

export default App
