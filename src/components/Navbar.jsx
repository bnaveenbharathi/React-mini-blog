import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <>
        <nav className="navbar">
            <h1>Mark Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create" className="newCreate" >New Blog</Link>
            </div>
        </nav>
    </>
  )
}

export default Navbar
