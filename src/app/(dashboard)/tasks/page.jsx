"use client"
import React from 'react'
import AIFormHelper from '@/components/AIFormHelper'
// Tasks page  
export default function TasksPage() {
  // Task and reminders state
  const [tasks, setTasks] = React.useState([
    { id: 1, text: 'Call major donor', completed: false, reminder: '2025-12-18' },
    { id: 2, text: 'Send thank you email', completed: false, reminder: '2025-12-19' },
  ]);
  const [newTask, setNewTask] = React.useState('');
  const [newReminder, setNewReminder] = React.useState('');

  function addTask(e) {
    e.preventDefault();
    if (!newTask) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask,
        completed: false,
        reminder: newReminder || null,
      },
    ]);
    setNewTask('');
    setNewReminder('');
  }

  function toggleTask(id) {
    setTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function removeTask(id) {
    setTasks(tasks => tasks.filter(task => task.id !== id));
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tasks & Reminders</h1>
      <form className="flex gap-2 items-end" onSubmit={addTask}>
        <div>
          <div className="flex items-center">
            <label className="block text-sm font-medium">Task</label>
            <AIFormHelper field="taskText" context={{}} onSuggest={(val) => setNewTask(val)} />
          </div>
          <input
            className="border rounded px-3 py-2"
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="Enter a new task..."
          />
        </div>
        <div>
          <div className="flex items-center">
            <label className="block text-sm font-medium">Reminder Date</label>
            <AIFormHelper field="reminder" context={{}} onSuggest={(val) => setNewReminder(val)} />
          </div>
          <input
            className="border rounded px-3 py-2"
            type="date"
            value={newReminder}
            onChange={e => setNewReminder(e.target.value)}
          />
        </div>
        <button className="btn-primary" type="submit">
          Add Task
        </button>
      </form>
      <ul className="space-y-2">
        {tasks.length === 0 && <li className="text-gray-500">No tasks yet.</li>}
        {tasks.map(task => (
          <li key={task.id} className="flex items-center gap-3 border rounded px-3 py-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="mr-2"
            />
            <span className={task.completed ? 'line-through text-gray-400' : ''}>{task.text}</span>
            {task.reminder && (
              <span className="ml-4 text-xs text-gray-500">Remind: {task.reminder}</span>
            )}
            <button
              className="ml-auto font-medium transition-colors hover:opacity-80"
              style={{ color: 'hsl(var(--destructive))' }}
              onClick={() => removeTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
