import { v7 as uuidv7 } from 'uuid';
import { useState, useEffect, useCallback, useMemo } from 'react';

// Fix 1: Menghapus Inline API key (security fix)

function App() {
  // Fix 2: Menggunakan useState dengan lazy initializer (di execute 1x saat initial render)
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem('todos');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading todos:', e);
      return [];
    }
    return [];
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  // Fix 3: Menggunakan useState dengan lazy initializer (dipindah ke lazy state initializer)
  // Fix 4: Mengatasi useEffect yang terlalu sering run dengan menambahkan dependency array
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Fix 5: Function addTodo menggunakan useCallback agar tidak recreate setiap render
  const addTodo = useCallback((input) => {
    if (input.trim() === '') {
      alert('Please enter a todo');
      return;
    }

    // Fix 6: Menggunakan UUIDv7 sebagai ID, pengganti Date.now() (untuk mencegah collision)
    const newTodo = {
      id: uuidv7(),
      text: input,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setInput('');
  }, []);

  // Fix 7: Menambahkan error handling
  const deleteTodo = (id) => {
    try {
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // Fix 8: Logic filtering menggunakan useMemo agar tidak recreate setiap render
  const getFilteredTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed);
    }
    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  }, [filter, todos]);

  // Fix 9: Calculation menggunakan useMemo agar tidak recreate setiap render
  const stats = useMemo(() => {
    return {
      total: todos.length,
      completed: todos.filter((t) => t.completed).length,
      active: todos.filter((t) => !t.completed).length,
    };
  }, [todos]);

  // Fix 10: Memisahkan inline event handler dengan arrow function (re-create setiap render) menjadi function terpisah dengan bantuan useCallback
  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const handleInputKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        addTodo(e.target.value);
      }
    },
    [addTodo],
  );

  const handleAddClick = useCallback(() => {
    addTodo(input);
  }, [addTodo, input]);

  const handleFilterChange = useCallback((e) => {
    const value = e.target.dataset.filter;
    setFilter(value);
  }, []);

  // Fix 10: Inline event handler dengan arrow function (re-create setiap render) sudah dipisahkan menjadi function terpisah dengan bantuan useCallback
  return (
    <div className='app'>
      <h1>My Todo List</h1>

      {/* Fix 11: Menambahkan label untuk accessibility */}
      <div className='input-section'>
        <label>
          <span id='todo-input'>Insert your todo here</span>
          <input
            aria-labelledby='todo-input'
            type='text'
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
            placeholder='What needs to be done?'
          />
        </label>
        <button onClick={handleAddClick}>Add</button>
      </div>

      {/* Fix 12: Menggunakan conditional className */}
      <div className='filter-section'>
        <button
          onClick={handleFilterChange}
          data-filter='all'
          className={filter === 'all' ? 'selected' : ''}
        >
          All
        </button>
        <button
          onClick={handleFilterChange}
          data-filter='active'
          className={filter === 'active' ? 'selected' : ''}
        >
          Active
        </button>
        <button
          onClick={handleFilterChange}
          data-filter='completed'
          className={filter === 'completed' ? 'selected' : ''}
        >
          Completed
        </button>
      </div>

      <div className='todo-list'>
        {/* Fix 13: Menambahkan handling untuk empty state */}
        {getFilteredTodos.length === 0 ? (
          <p>No todos found</p>
        ) : (
          getFilteredTodos.map((todo) => (
            // Fix 14: Key menggunakan ID
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <input
                type='checkbox'
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              {/* Fix 15: Mengatasi potential XSS jika text dari user input */}
              <span>{todo.text}</span>
              <button
                className='delete-btn'
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div className='stats'>
        <p>
          Total: {stats.total} | Active: {stats.active} | Completed:{' '}
          {stats.completed}
        </p>
      </div>

      {/* Fix 16: Menghapus debug code yang tertinggal */}
    </div>
  );
}

export default App;
