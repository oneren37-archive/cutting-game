import React from 'react';
import { useContext } from "react";
import {Form, Button} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { ctx } from '../context'
import './Auth.css';

const Auth = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const {username, setUsername} = useContext(ctx)
    const navigate = useNavigate();

    const afterSubmit = (data) => {
        setUsername(data.name)
        navigate('/levels')
    }

    return (
        <div className='Auth'>
            <div className='form-container'>
                <Form onSubmit={handleSubmit(data => afterSubmit(data))}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control 
                            type="text" 
                            placeholder="Введите имя" 
                            autoComplete="off" 
                            {...register('name', { required: true })} 
                        />
                        <Form.Text className="text-muted" >
                            Если Вы уже играли ранее, введите имя и сможете увидеть прогресс
                        </Form.Text>
                        {errors.name && (
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Вперед
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Auth