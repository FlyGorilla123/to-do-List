// pages/index.js
import { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [newCategory, setNewCategory] = useState('');

    // Load tasks and categories from localStorage on mount
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
        const savedCategories = localStorage.getItem('categories');
        if (savedCategories) {
            setCategories(JSON.parse(savedCategories));
        }
    }, []);

    // Save tasks and categories to localStorage whenever they change
    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    useEffect(() => {
        if (categories.length > 0) {
            localStorage.setItem('categories', JSON.stringify(categories));
        }
    }, [categories]);

    // addTask function checks if input is empty string, if so returns
    const addTask = () => {
        if (taskInput.trim() === '' || taskCategory.trim() === '') return;
        // Creates a new task as an object
        const newTask = { 
            id: Date.now(), 
            text: taskInput, 
            completed: false, 
            category: taskCategory 
        };
        // Updates tasks, appending new tasks at the end
        setTasks([...tasks, newTask]);

        // Automatically adds new categories
        if (!categories.includes(taskCategory)) {
            setCategories([...categories, taskCategory]);
        }
        // Resets Task/Category input after new addition
        setTaskInput('');
        setTaskCategory('');
    };
    // Checks if new category is empty or already exists
    const addCategory = () => {
        if (newCategory.trim() === '' || categories.includes(newCategory)) return;
        setCategories([...categories, newCategory]);
        setNewCategory('');
    };

    const toggleTaskCompletion = (taskId) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const editTask = (taskId, newText) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, text: newText } : task
        ));
    };

    const deleteCategory = (category) => {
        const updatedCategories = categories.filter(cat => cat !== category);

        setCategories(updatedCategories);

        setTasks(tasks.filter(task => task.category !== category));
        localStorage.setItem('categories', JSON.stringify(updatedCategories));
        localStorage.setItem('tasks', JSON.stringify(tasks.filter(task => task.category !== category)));
    };

    const editCategory = (oldCategory, newCategoryName) => {
        if (!newCategoryName.trim() || categories.includes(newCategoryName)) return;
        const updatedCategories = categories.map(cat => cat === oldCategory ? newCategoryName : cat);

        setCategories(updatedCategories);

        setTasks(tasks.map(task => task.category === oldCategory ? { ...task, category: newCategoryName } : task));
        localStorage.setItem('categories', JSON.stringify(updatedCategories));
        localStorage.setItem('tasks', JSON.stringify(tasks.map(task => task.category === oldCategory ? { ...task, category: newCategoryName } : task)));
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#043927] via-[#0b3d3d] to-[#046307] p-4">
            <div className="backdrop-blur-md bg-white/10 p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-3xl font-bold text-white mb-4 text-center">To-Do-List</h1>
                <div className="flex flex-col space-y-3">
                    <input 
                        className="border border-white/20 bg-white/10 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        type="text" 
                        value={taskInput} 
                        onChange={(e) => setTaskInput(e.target.value)}
                        onKeyDown={(e) => {if (e.key === 'Enter') addTask(); }}
                        placeholder="Enter a task..."
                    />
                    <div className="flex space-x-2">
                        <select
                            className="border border-white/20 bg-white/10 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none hover:bg-green-500 hover:text-white [&>option]:bg-[#042F2E] [&>option]:text-white"
                            value={taskCategory}
                            onChange={(e) => setTaskCategory(e.target.value)}
                        >
                            <option value="" className="text-gray-300">Select a Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                        <input 
                            className="border border-white/20 bg-white/10 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            type="text" 
                            value={newCategory} 
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="New category..."
                        />
                        <button 
                            onClick={addCategory} 
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
                        >
                            +
                        </button>
                    </div>
                    <button 
                        onClick={addTask} 
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
                    >
                        Add Task
                    </button>
                </div>
                <div className="mt-4">
                    <h2 className="text-xl font-semibold text-white">Filter by Category</h2>
                    <div className="flex items-center mt-2">
                        <select 
                            className="border border-white/20 bg-white/10 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none hover:bg-green-500 hover:text-white [&>option]:bg-[#042F2E] [&>option]:text-white"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="All" className="text-gray-300">All</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                        {/* Mini circle buttons for editing and deleting categories */}
                        <div className="flex space-x-2 ml-2">
                            <button 
                                onClick={() => {
                                    if (selectedCategory === 'All') return;
                                    const newName = window.prompt("Enter new name for category: " + selectedCategory, selectedCategory);
                                    if (newName && newName.trim() !== '' && newName !== selectedCategory) {
                                        editCategory(selectedCategory, newName.trim());
                                        setSelectedCategory(newName.trim());
                                    }
                                }} 
                                className="w-6 h-6 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center"
                            >
                                <span className="text-white text-xs font-bold">E</span>
                            </button>
                            <button 
                                onClick={() => {
                                    if (selectedCategory === 'All') return;
                                    if (window.confirm("Are you sure you want to delete category: " + selectedCategory + "?")) {
                                        deleteCategory(selectedCategory);
                                        setSelectedCategory('All');
                                    }
                                }} 
                                className="w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <TaskList 
                        tasks={selectedCategory === 'All' ? tasks : tasks.filter(task => task.category === selectedCategory)}
                        toggleTaskCompletion={toggleTaskCompletion} 
                        deleteTask={deleteTask} 
                        editTask={editTask} 
                        className="w-full backdrop-blur-lg bg-[#042F2E]/50 p-4 rounded-md text-white border border-white/20 shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
}

