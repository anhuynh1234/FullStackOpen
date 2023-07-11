
const Header = function({header, }) {
    return(
        <h1>{header}</h1>
    )
}

const Total = ({parts}) => {
    let total = 0;
    const valuesAll = Array([])
    parts.map(part => valuesAll.push(part.exercises))
    total = valuesAll.reduce((s, p) => Number(s) + Number(p), 0)
    return(
        <p style={{fontWeight: "bold"}}>Total: {total} exercises</p>
    )
}

const Course = ({course}) => {
    return(
        <div>
            <Header header={course.name} />
            {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
            <Total parts={course.parts} />
        </div>
    )
}

export default Course