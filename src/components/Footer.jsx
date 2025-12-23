import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-10 bg-gray-100">
      <div className=" flex w-full bg-white space-y-2 flex-col">
        {/* Contact Form */}
        <div className="max-w-md mx-auto p-4">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <form className="space-y-2">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Link to */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <a href="#" className="text-blue-500 hover:text-blue-700">About</a>
          <a href="#" className="text-blue-500 hover:text-blue-700">Privacy Policy</a>
          <a href="#" className="text-blue-500 hover:text-blue-700">Terms of Service</a>
          <a href="#" className="text-blue-500 hover:text-blue-700">Contact</a>
          <a href="#" className="text-blue-500 hover:text-blue-700">FAQ</a>
          <a href="#" className="text-blue-500 hover:text-blue-700">Support</a>
          <a href="#" className="text-blue-500 hover:text-blue-700">Blog</a>
          <a href="#" className="text-blue-500 hover:text-blue-700">Careers</a>
          <a href="#" className="text-blue-500 hover:text-blue-700">Sitemap</a>
        </div>

        <p className="text-center p-4 text-gray-600">&copy; 2024 ToDo List. All rights by Github-D7741.</p>

      </div>
    </footer>
  )
}

export default Footer
