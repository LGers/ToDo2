//Original lesson in: https://github.com/bradtraversy/react-crash-2021
import {useState, useEffect} from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import{BrowserRouter as Router, Route} from "react-router-dom";
import About from "./components/About";

const tasksState = []

function App() {
    const _baseURL='http://localhost:5000/tasksState'
    const baseURL='https://611929468ed292001799eea4.mockapi.io/tasksState'
    const [tasks, setTasks] = useState(tasksState)
    const [showAddTask, setShowAddTask] = useState(false)

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }

        getTasks()
    }, [])

    //Fetch tasks
    const fetchTasks = async () => {
        const response = await fetch(baseURL)
        const data = await response.json()
        console.log(data)
        return data
    }
    //Fetch task
    const fetchTaskUpdate = async (id) => {
        const response = await fetch(`${baseURL}/${id}`)
        const data = await response.json()
        console.log(data)
        return data
    }

    //Add Task function
    const addTask = async (task) => {
        const response = await fetch(baseURL,
            {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(task)
            })
        const data = await response.json()
        setTasks([...tasks, data])

        /*const id = Math.floor(Math.random() * 10000) + 1
        const newTask = {id, ...task}
        setTasks([...tasks, newTask])
         */
    }

    //Delete TASK from local State function
    const _deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }
    //Delete TASK from jsonServer
    const deleteTask = async (id) => {
        await fetch(`${baseURL}/${id}`,
            {method: 'DELETE'}
        )
        setTasks(tasks.filter((task) => task.id !== id))
    }

    //Toggle reminder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTaskUpdate(id)
        const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}
        const response = await fetch(`${baseURL}/${id}`,
            {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(updatedTask)
            })
        const data = await response.json()

        setTasks(tasks.map((t) => t.id === id
            ? {...t, reminder: data.reminder}
            : t
        ))
    }

    return (
        <Router>
            <div className="container">

                <Header title='ToDo List'
                        onAdd={() => setShowAddTask(!showAddTask)}
                        showAdd={showAddTask}
                />

                <Route path = '/' exact render={(props)=>(
                    <>
                        {showAddTask && <AddTask onAddTask={addTask}/>}
                        {tasks.length > 0
                            ? < Tasks tasks={tasks}
                                      onDelete={deleteTask}
                                      onToggle={toggleReminder}
                            />
                            : <h3>No Tasks to show</h3>
                        }
                    </>
                )}/>
                <Route path = '/about' component={About}/>
                <Footer/>
            </div>

        </Router>
    );
}

export default App;
