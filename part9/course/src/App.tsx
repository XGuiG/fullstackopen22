import { CoursePart, HeaderProps } from "./types";
import courseParts from "./data/courses";

const Header = (props: HeaderProps) => <div><h2>{props.name}</h2></div>

const Part = ({part}:{part: CoursePart}) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
  }

    switch(part.kind) {
      case 'basic':
        return (
          <div>
            <div>
              <em>{part.description}</em>
            </div>
          </div>
        )
      case 'group':
        return (
          <div>
            <div>
              project exercises {part.groupProjectCount}
            </div>
          </div>
        )
      case 'background':
        return (
          <div>
            <div>
              <em>{part.description}</em>
            </div>
            <div>
              submit to <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
            </div>
          </div>
        )
      case 'special' :
        return (
          <div>
            <div>
              <em>{part.description}</em>
            </div>
            <div>
              required skills: {part.requirements.join(', ')}
            </div>
          </div>
        )
      default: return assertNever(part)
    }
}

const Content = () => {
  return (
    <div>
      {courseParts.map(part => (
        <div key={part.name}>
          <div>
            <h4>{part.name} {part.exerciseCount}</h4>
          </div>
          <Part part={part}/>
        </div>
        ))}
    </div>
  )
}

const Total = () => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content />
      <Total />
    </div>
  );
};

export default App;