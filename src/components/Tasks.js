import Task from "./Task";

const Tasks = ({tasks, onDelete, onToggle}) => {

    return (
        <div>
            {tasks.map((t) => (
                <Task key={t.id} task={t} onDelete={onDelete} onToggle={onToggle}/>
            ))}
        </div>
    )
}


export default Tasks