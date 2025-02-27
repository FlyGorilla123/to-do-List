import TaskItem from './TaskItem';
// Recieves list of tasks from index.js - renders a taskItem for each task
export default function TaskList({ tasks, toggleTaskCompletion, deleteTask, editTask }) {
    return (
        <ul className="mt-4 w-full max-w-md">
            {tasks.map(task => (
                <TaskItem 
                    key={task.id} 
                    task={task} 
                    toggleTaskCompletion={toggleTaskCompletion} 
                    deleteTask={deleteTask} 
                    editTask={editTask}/>
            ))}
        </ul>
    );
}