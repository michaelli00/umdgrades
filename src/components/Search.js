import React from 'react';

const Search = ({ searchCallBack, course, professor }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    searchCallBack(event.target.course.value, event.target.professor.value, event.target.semester.value);
  }

  return (
    <div>
      <nav className="navbar">
        <form className="form-inline" onSubmit={handleSubmit}>
          <label>Course Name</label>
          <input name="course" className="form-control mr-sm-2" type="search" placeholder="CMSC351" aria-label="Search"/>
          <label>Professor Name</label>
          <input name="professor" className="form-control mr-sm-2" type="search" placeholder="Clyde Kruskal" aria-label="Search"/>
          <label>Semester</label>
          <select name="semester" className="custom-select">
            <option value="201908">Fall 2019</option>
            <option value="201901">Spring 2019</option>
            <option value="201808">Fall 2018</option>
          </select>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>
    </div>
  );
}

export default Search;
