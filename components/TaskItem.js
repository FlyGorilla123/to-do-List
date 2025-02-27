import { useState } from "react";

export default function TaskItem({ task, toggleTaskCompletion, deleteTask, editTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(task.text);

    return (
        <li className="flex justify-between items-center p-2 backdrop-blur-lg bg-[#042F2E]/50 text-white shadow-md mb-2 rounded-md border border-white/20">
            <div className="flex items-center">
                <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => toggleTaskCompletion(task.id)} 
                    className="mr-2 appearance-none w-5 h-5 border-gray-600 rounded-md bg-[#0B3D3D] checked:bg-green-500 checked:border-green-500 focus:outline-none"
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        className="border border-white/20 bg-white/10 text-white p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                ) : (
                    <span className={task.completed ? "line-through text-red-400" : "text-white"}>{task.text}</span>
                )}  
            </div>
            <div className="flex space-x-2">
                {isEditing ? (
                    <button
                        onClick={() => {
                            editTask(task.id, newText);
                            setIsEditing(false);
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md font-bold text-sm"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded-md font-bold text-sm"
                    >
                        E
                    </button>
                )}
                <button 
                    onClick={() => deleteTask(task.id)} 
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md font-bold text-sm"
                >
                    X
                </button>
            </div>
        </li>
    );
}

