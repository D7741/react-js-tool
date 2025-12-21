import React from 'react'

const Home = () => {
  const [showForm, setShowForm] = React.useState(false)
  const [toDo, setToDo] = React.useState([])
  const [title, setTitle] = React.useState('')
  const [details, setDetails] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !details.trim()) return

    const newToDo = {
      id: Date.now(),
      title,
      details,
      completed: false,
    }

    setToDo((prev) => [newToDo, ...prev])
    setTitle('')
    setDetails('')
  }

  return (
    <section className="w-full h-screen bg-gray-100 flex px-12 py-10 gap-10 overflow-hidden">
      {/* Left Screen*/}
      <div className="w-1/2">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your To-Do List</h1>
        <p className="text-lg mb-6 text-gray-600">Organize your tasks efficiently</p>

        <button
          onClick={() => setShowForm((s) => !s)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
        >
          {showForm ? 'Hide Form' : 'Get Started'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <label className="font-medium text-gray-700">Work Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter work title"
              className="border border-gray-300 rounded px-4 py-2 bg-white"
            />

            <label className="font-medium text-gray-700">Details</label>
            <input
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Enter work details"
              className="border border-gray-300 rounded px-4 py-2 bg-white"
            />

            <button
              type="submit"
              className="h-10 bg-blue-600 hover:bg-blue-800 text-white rounded-lg"
            >
              Add Work
            </button>
          </form>
        )}
      </div>

      {/* Right Screen*/}
      <div className="w-1/2 border-l border-dotted border-gray-300 pl-10 flex flex-col">

        {/* Super Search Bar */}
        <input type="text" placeholder="  Search..." className='w-full max-w-md m-10 p-2 rounded-full bg-gray-500 text-white'/>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Tasks</h2>
          <span className="text-sm text-gray-500">{toDo.length} items</span>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {toDo.length === 0 && <p className="text-gray-400">No tasks yet</p>}

          {toDo.map((todo, index) => (
            <div
              key={todo.id}
              className="
                relative
                bg-linear-to-br from-white to-gray-50
                p-6
                rounded-2xl
                shadow-md
                hover:shadow-xl
                transition-all
                duration-300
                border border-gray-100
                overflow-hidden
                before:absolute
                before:top-0
                before:left-0
                before:w-1
                before:h-full
                before:bg-linear-to-b
                before:from-blue-500
                before:to-purple-500
              "
            >
              {/* Index Badge on right corner*/}
              <div className="absolute top-4 right-4 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">{index + 1}</span>
              </div>

              <div className="relative z-10">
                <h3 className={`font-bold text-lg mb-2 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {todo.title}
                </h3>
                <p className={`leading-relaxed ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                  {todo.details}
                </p>

                <div className="flex justify-between items-center mt-6">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setToDo((prev) =>
                          prev.map((item) =>
                            item.id === todo.id ? { ...item, completed: !item.completed } : item
                          )
                        )
                      }}
                      className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                    >
                      {todo.completed ? 'Completed' : 'Mark Complete'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setToDo((prev) => prev.filter((item) => item.id !== todo.id))}
                      className="text-sm px-3 py-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>

                  <span className="text-xs text-gray-400">
                    {Math.max(0, Math.floor((Date.now() - todo.id) / (1000 * 60 * 60 * 24)))} days ago
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
    </section>
  )
}

export default Home
