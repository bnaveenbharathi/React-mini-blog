import { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Mark');
  const [isPending, setPending] = useState(false)
  const navigateTo=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    const blog = { title, body, author }
    setPending(true)
    setTimeout(() => {
      fetch('http://localhost:8000/blogs', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog)
      }).then(() => {
        setPending(false)
        console.log('New Blog Added');
        navigateTo('/')
      })
    }, 1000);

   

  }
  return (
    <>

      <div className="create">
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="">Blog Title:</label>
          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="">Blog Content:</label>
          <textarea type="text" required value={body} onChange={(e) => setBody(e.target.value)} ></textarea>
          <label htmlFor="">Blog author:</label>
          <select name="" id="" value={author} onChange={(e) => setAuthor(e.target.value)}>
            <option value="Mark">Mark</option>
            <option value="Naveen">Naveen</option>

          </select>

          {!isPending && <button>Add Blog</button>}
          {isPending && <button>Adding Blog..</button>}

        </form>
      </div>

    </>
  )
}

export default Create
