import React from 'react'

const Hero = () => {
    // State variables for form visibility and to-do items
    const[showForm, setShowForm] = React.useState(false);
    const[toDo, setToDo] = React.useState([]);
    const[title, setTitle] = React.useState('');
    const[details, setDetails] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !details.trim()) return;
        const newToDo = { id:Date.now(), title, details };
        setToDo([...toDo, newToDo]);
        setTitle('');
        setDetails('');
    };

  return (
    <section className="min-h-screen flex items-center bg-gray-100 px-12">
      
      {/* Left content */}
      <div className="w-1/2">
        <h1 className="text-4xl font-bold mb-4"> Welcome to Your To-Do List </h1>
        <p className="text-lg mb-8 text-gray-600"> Organize your tasks efficiently </p>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"> {showForm ? 'Hide Form' : 'Get Started'} </button>

        {showForm &&
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col space-y-4">
                <label>Work Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter work title" className="border border-gray-300 rounded px-4 py-2"/>
                <label>Details</label>
                <input type="text" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Enter work details" className="border border-gray-300 rounded px-4 py-2"/>
                <button type="submit" className='h-10 bg-blue-500 hover:bg-blue-700 text-white rounded-xl border-current'>Add Work</button>
            </form>
        }
      </div>

      {/* Right content */}
      {/* &&：短路运算，if the statement is true，则渲染后面的元素 */}
      <div className="w-1/2 flex flex-wrap gap-4 p-8">
        {toDo.length === 0 && (
          <p className="text-gray-400">No tasks yet</p>
        )}

        {toDo.map((todo) => (
          <div key={todo.id} className="bg-white px-4 py-3 rounded-lg shadow-md">
            <h3 className="font-semibold">{todo.title}</h3>
            {todo.details && (
              <p className="text-sm text-gray-500">{todo.details}</p>
            )}
          </div>
        ))}
      </div>

    </section>
  )
}

export default Hero
