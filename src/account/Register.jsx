import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import '../styles/signup-styles.css'
import { useDispatch } from 'react-redux';

import { history } from '_helpers';
import { userActions, alertActions } from '_store';

export { Register };

function Register() {
    const dispatch = useDispatch();
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        try {
            await dispatch(userActions.register(data)).unwrap();
            history.navigate('/account/login');
            dispatch(alertActions.success({ message: 'Registration successful', showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <form onSubmit={handleSubmit(onSubmit)} class="form">
                <p class="title">Register </p>
                <p class="message">Signup now and get full access to our app. </p>
                <div class="flex">

                    <input name="firstName" placeholder='first Name' type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />

                    <div className="invalid-feedback">{errors.firstName?.message}</div>


                    <input required="" name="lastName" placeholder="Last Name" type="text"  {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />

                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
                <input required="" name='username' placeholder="UserName"  {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                <input {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} name='password' required="" placeholder="Password" type="password" />
                <div className="invalid-feedback">{errors.password?.message}</div>
                <button disabled={isSubmitting} className="btn btn-primary">
                    {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                    Register
                </button>
                <p class="signin">Already have an acount ? <Link to="../login" className="btn btn-link">Cancel</Link> </p>
            </form>
        </div>
    )
}
