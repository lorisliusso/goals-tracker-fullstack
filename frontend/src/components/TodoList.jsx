import './TodoList.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import BoxMaterialUI from './Box-MaterialUI'
import { useDispatch, useSelector } from 'react-redux'
import { getGoals } from '../actions/goalsActions'


const TodoList = () => {

    const [goal, setGoal] = useState('')
    const dispatch = useDispatch()
    const goalsState = useSelector(state => state.goals)
    const { goals } = goalsState


    useEffect(() => {

        dispatch(getGoals())

    }, [])


    function handleChange(e) {
        setGoal(e.target.value)
    }


    function handleSubmit(e) {
        e.preventDefault()

        axios.post('api/goals/manage-goals/', {
            "goal": goal,
        },
        )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        setGoal('')

        dispatch(getGoals())

    }


    function handleDelete(id) {

        axios.delete('api/goals/manage-goals/', {
            data: {
                "goal_id": id
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        dispatch(getGoals())

    }


    function handleCompleted(id, completed) {

        axios.put('api/goals/manage-goals/', {
            'goal_id': id,
            "goal_completed": !completed,
        },
        )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });


        dispatch(getGoals())

    }


    return (

        <section className='todo-list'>
            <h1 className='todo-list__h1'>Goals Tracker 2023</h1>
            <form method='POST' onSubmit={handleSubmit} className='todo-list__input-container'>
                <input onChange={handleChange} placeholder='add new goal...' value={goal}
                    className='todo-list__input' type="text" />

                <button type='submit' className='todo-list__button'>ADD!</button>
            </form>
            <ul className='todo-list__ul'>

                {goals.map(goal => {

                    return (

                        <li key={goal.id}>
                            <p>{goal.goal}</p>
                            <input className='checkbox' onClick={() => handleCompleted(goal.id, goal.completed)}
                                type="checkbox" id="completed" defaultChecked={goal.completed} />

                            <div>
                                <BoxMaterialUI value={goal.goal} id={goal.id} />
                                <button className='btn-delete' onClick={() => handleDelete(goal.id)}>DELETE</button>

                            </div>
                        </li>
                    )
                })}

            </ul>
        </section>
    )
}

export default TodoList