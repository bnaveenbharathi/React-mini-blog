import { Link } from "react-router-dom"

const BlogList = (props) => {
const {blogs,title}=props

  return (
   
    <div className="blog-list">
    <h2>{title}</h2>
    {
      blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <h2> {blog.title}</h2>
          <p>Written By {blog.author}</p>
          <Link to={`/blog/${blog.id}`}>
       <button>View</button></Link>
        </div>
      ))
    }

  </div>

  )
}

export default BlogList
