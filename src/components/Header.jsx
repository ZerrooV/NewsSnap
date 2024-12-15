import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <div className="container-fluid bg-info-subtle shadow pt-3">
      <div className="navigation container d-flex justify-content-between  align-items-center p-2">
      <NavLink to="/" className="navbar-brand fs-3 fw-semibold" id="logo">NewsSnap</NavLink>
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary btnMain" type="submit">Search</button>
            <button className="btn btn-primary btnCustom" type="submit">
              <i className="bx bx-search"></i>
            </button>

          </form>
      </div>
      <div className="container border-primary border-bottom border-2 p-1"></div>
      <div className="container p-1">
        <div className="navlink d-flex justify-content-around fw-medium">
          <NavLink to="/Indonesia" className={({ isActive }) => isActive ? 'active-link' : ''}>Indonesia</NavLink>
          <NavLink to="/Programming" className={({ isActive }) => isActive ? 'active-link' : ''}>Programming</NavLink>
          <NavLink to="/Covid" className={({ isActive }) => isActive ? 'active-link' : ''}>Covid-19</NavLink>
          <NavLink to="/Saved" className={({ isActive }) => isActive ? 'active-link' : ''}>Saved</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;
