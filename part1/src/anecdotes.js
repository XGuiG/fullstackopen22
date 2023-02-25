import { useState } from "react";

//1.12-1.14

const Header = ({header}) => (
    <div>
      <h1>{header}</h1>
    </div>
)

const Vote = ({vote}) => {
    return (
        <div>
            <p>
                has {vote} votes
            </p>
        </div>
    ) 
}

const Button = ({handleClick, txt}) => <button onClick={handleClick}>{txt}</button>

function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
}

function getMaxIndex(arr) {
    var max = arr[0];
    //声明了个变量 保存下标值
    var index = 0;
    for (var i = 0; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i];
            index = i;
        }
    }
    return index;
}

const App = () => {
    const anecdotes = [
      'If it hurts, do it more often',
      'Adding manpower to a late software project makes it later!',
      'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      'Premature optimization is the root of all evil.',
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]
  
    const [selected, setSelected] = useState(0)

    const setToSelected = () => () => {
        setSelected(randomNum(0, 6))
    }

    const [votePoints,setPoints]=useState(new Uint8Array(7))
    const setValueVote = () => () => { 
        votePoints[selected] += 1
        const copy=[...votePoints]
        setPoints(copy)
    }
    console.log(votePoints)

    const maxindex = getMaxIndex(votePoints) 
    const max = Math.max(...votePoints)

    return (
      <div>
        <Header header = "Anecdote of the day" />
        <p>{anecdotes[selected]}<br></br></p>
        <Vote vote = {votePoints[selected]} />
        <Button handleClick={setValueVote()} txt = "vote"/>
        <Button handleClick={setToSelected()} txt = "next anecdote" />
        <Header header = "Anecdote with most votes" />
        <p>{anecdotes[maxindex]}<br></br></p>
        <Vote vote = {max} />
      </div>
    )
  }
  
  export default App