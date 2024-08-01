const Content = ({ content }) => {
    return (
        <div>
            {content.map((part) => (<p key={part.id}>{part.name} {part.exercises}</p>))}
            <b>total of {content.reduce((sum,part) => sum + part.exercises, 0)} exercises</b>
        </div>
    )
}

export default Content