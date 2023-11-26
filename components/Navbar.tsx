import "./Navbar.scss"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav>
      <Link href="/" className="logo">
        Memmer's blog
      </Link>
      <div className="nav-links">
        <div className="nav-link">
          <Link href="/">Home</Link>
        </div>
        <div className="nav-link">
          <Link href="/blog">Blog</Link>
        </div>
        <div className="nav-link">
          <Link href="/about">About</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar