import BlogList from "./BlogList";
import useFetch from "./useFetch";


const Home = () => {
  const {data:blogs,isPending,error}=useFetch("https://json-server-8ahi.onrender.com/blogs")
  
  return (
<>
    <div className="home">
    {error && <div>{error} </div>}
    {isPending && <div>loading..</div>}
    {blogs && <BlogList blogs={blogs} title="All Blogs !"  />}
    </div>

</>
  )
}

export default Home
