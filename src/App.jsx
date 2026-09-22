import { v7 as uuidv7 } from 'uuid';

// Fix 1: Menghapus Inline API key (security fix)

function App() {
  // Issue 2: State management bisa lebih baik
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')
  
  // Issue 3: useEffect tanpa dependency array yang tepat
  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('todos')
    if (saved) {
      setTodos(JSON.parse(saved))
    }
  }, [])
  
  // Issue 4: useEffect yang terlalu sering run
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  })
  
  // Issue 5: Function yang tidak di-memoize, re-create setiap render
  const addTodo = () => {
    if (input.trim() === '') {
      alert('Please enter a todo')
      return
    }
    
    // Fix 6: Menggunakan UUIDv7 sebagai ID, pengganti Date.now() (untuk mencegah collision)
    const newTodo = {
      id: uuidv7(),
      text: input,
      completed: false,
      createdAt: new Date().toISOString()
    }
    
    setTodos([...todos, newTodo])
    setInput('')
  }
  
  // Issue 7: Tidak ada error handling
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }
  
  // Issue 8: Logic filtering yang bisa dipindah ke useMemo
  const getFilteredTodos = () => {
    if (filter === 'active') {
      return todos.filter(todo => !todo.completed)
    }
    if (filter === 'completed') {
      return todos.filter(todo => todo.completed)
    }
    return todos
  }
  
  // Issue 9: Calculation yang tidak perlu di setiap render
  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length
  }
  
  // Issue 10: Inline event handler dengan arrow function (re-create setiap render)
  return (
    <div className="app">
      <h1>My Todo List</h1>
      
      {/* Issue 11: Tidak ada label untuk accessibility */}
      <div className="input-section">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addTodo()
            }
          }}
          placeholder="What needs to be done?"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      
      {/* Issue 12: Inline styles (inconsistent dengan CSS file) */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setFilter('all')}
          style={{ background: filter === 'all' ? '#28a745' : '#007bff' }}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('active')}
          style={{ background: filter === 'active' ? '#28a745' : '#007bff' }}
        >
          Active
        </button>
        <button 
          onClick={() => setFilter('completed')}
          style={{ background: filter === 'completed' ? '#28a745' : '#007bff' }}
        >
          Completed
        </button>
      </div>
      
      <div className="todo-list">
        {/* Issue 13: Tidak ada handling untuk empty state */}
        {getFilteredTodos().map((todo) => (
          // Issue 14: Key menggunakan index bisa lebih baik dengan ID
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input 
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {/* Issue 15: Potential XSS jika text dari user input */}
            <span dangerouslySetInnerHTML={{ __html: todo.text }} />
            <button 
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      
      <div className="stats">
        <p>Total: {stats.total} | Active: {stats.active} | Completed: {stats.completed}</p>
      </div>
      
      {/* Fix 16: Menghapus debug code yang tertinggal */}
    </div>
  )
}

export default App
