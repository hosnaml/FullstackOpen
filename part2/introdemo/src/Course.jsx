const Course = ({ courses }) => {
  const total = courses.map((course) =>
    course.parts.reduce((sum, parts) => sum + parts.exercises, 0)
  );
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          {course.parts.map((part) => (
            <p key={part.id}>
              {part.name} {part.exercises}
            </p>
          ))}
          <p>
            Total of{" "}
            {course.parts.reduce((sum, parts) => sum + parts.exercises, 0)}{" "}
            exercises
          </p>
        </div>
      ))}
    </div>
  );
};

export default Course;
