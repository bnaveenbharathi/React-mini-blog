import { useParams,Link,useNavigate } from "react-router-dom"
import useFetch from "./useFetch"


const BlogDetail = () => {
  const navigateTo=useNavigate()
    const {id}=useParams()
    const {data:blog,error,isPending}=useFetch(`http://localhost:8000/blogs/${id}`)
     const handleClick=()=>{
      fetch(`http://localhost:8000/blogs/${blog.id}`,{
        method:'DELETE',

      }).then(()=>{
        navigateTo('/')
      })
     }
  return (
    <>
      <div className="blog-detail">
      
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>{blog.body}</p><br />
          <p><b>Author: </b>{blog.author}</p><br />
          <Link to='/'><button>Back</button></Link><br /><br />
          <button onClick={handleClick}>Delete</button>
        </article>
      )}


      </div>
    </>
  )
}

export default BlogDetail
