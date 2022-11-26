import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getGoals } from '../actions/goalsActions'
import "./BoxMaterial.scss"


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'white',
    bgcolor: '#3da4bc'
};

const BoxMaterialUI = ({ value, id }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [newValue, setNewValue] = React.useState(value)
    const dispatch = useDispatch()

    function editGoal() {

        axios.put('api/goals/edit-goal/', {
            'goal_id': id,
            "edit_goal": newValue,
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
        <div>
            <button className='edit' onClick={handleOpen}>EDIT</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography className='title' id="modal-modal-title" variant="h6" component="h2">
                        Edit your goal:
                    </Typography>
                    <input onChange={e => setNewValue(e.target.value)} type="text" value={newValue} />
                    <button className='btn-apply' onClick={editGoal}>APPLY</button>
                </Box>
            </Modal>
        </div>
    );
}

export default BoxMaterialUI;