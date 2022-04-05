import React, { useState } from "react";
import { hasConflict, toggle, getCourseNumber, getCourseTerm, terms } from "../utilities/times";


const Course = ({ course, selected, setSelected }) => {
  const isSelected = selected.includes(course);
  const isDisabled = !isSelected && hasConflict(course, selected);
  const style = {
    backgroundColor: isDisabled? 'lightgray' : isSelected ? 'lightgreen' : 'white'
  };
  return (
    <div className="card m-1 p-2"
    onClick={ isDisabled ? null : () => setSelected(toggle(course, selected))}
    style={style}>
      <div className="card-body">
        <div className="card-title">{ getCourseTerm(course) } CS { getCourseNumber(course) }</div>
        <div className="card-text">{ course.title }</div>
        <div className="card-text">{ course.meets }</div>
      </div>
    </div>
  );
};

export default Course;