import {FaTimes} from 'react-icons/fa'

const Task = ({task, onDelete, onToggle}) => {

    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.text}
                <FaTimes
                    style={{color: 'red', cursor: 'pointer'}}
                    onClick={() => onDelete(task.id)}

                />
            </h3>
            <p>{task.day} <span style={{marginLeft:'100px', textAlign:'right', fontSize:'12px'}}>___id: {task.id}</span></p>
        </div>
    )
}

export default Task