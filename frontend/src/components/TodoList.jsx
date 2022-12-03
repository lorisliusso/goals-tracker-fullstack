import './TodoList.scss'
import { useState, useEffect } from 'react'
import BoxMaterialUI from './Box-MaterialUI'
import { useQuery, useMutation, gql } from '@apollo/client';

const TodoList = () => {

    //get
    const GET_GOALS = gql`
     query getGoals{
       goals {
        id
        goal
        completed
       }
     }
   `;

    //post
    const ADD_GOAL = gql`
   mutation createNewGoal($newGoal: String!) {
     createNewGoal(newGoal: $newGoal) {
       goal{
        id
        goal
       }
     }
    }
 `;
    //delete
    const DELETE_GOAL = gql`
 mutation deleteGoal($id: ID!) {
   deleteGoal(id: $id) {
    msg
  }
 }
`;

    const [goal, setGoal] = useState('')
    const { loading, error, data } = useQuery(GET_GOALS);
    const [createNewGoal] = useMutation(ADD_GOAL, {
        refetchQueries: [
            { query: GET_GOALS }]
    });
    const [deleteGoal] = useMutation(DELETE_GOAL, {
        refetchQueries: [
            { query: GET_GOALS }]
    });


    function handleChange(e) {
        setGoal(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        createNewGoal({
            variables: { newGoal: goal },
        });

        setGoal('')
    }

    function handleDelete(id) {

        deleteGoal({
            variables: { id: id },
        });
    }

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (

        <section className='todo-list'>
            <h1 className='todo-list__h1'>Goals Tracker 2023</h1>
            <form method='POST' onSubmit={handleSubmit} className='todo-list__input-container'>
                <input onChange={handleChange} placeholder='add new goal...' value={goal}
                    className='todo-list__input' type="text" />

                <button type='submit' className='todo-list__button'>ADD!</button>
            </form>
            <ul className='todo-list__ul'>

                {data.goals.map(goal => {

                    return (

                        <li key={goal.id}>
                            <p>{goal.goal}</p>
                            <input className='checkbox'
                                type="checkbox" id="completed" defaultChecked={goal.completed} />

                            <div>
                                <BoxMaterialUI value={goal.goal} id={goal.id} />
                                <button onClick={() => handleDelete(goal.id)} className='btn-delete'>DELETE</button>

                            </div>
                        </li>
                    )
                })}

            </ul>
        </section>
    )
}

export default TodoList