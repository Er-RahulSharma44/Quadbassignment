import { Link } from 'react-router-dom';
import '../styles/login-styles.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { authActions } from '_store';

export { Login };

function Login() {
    const dispatch = useDispatch();
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ username, password }) {
        return dispatch(authActions.login({ username, password }));
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <form onSubmit={handleSubmit(onSubmit)} class="form">
                <p class="title">Login</p>
                <div class="input-container">
                    <input name='Enter userName' className={`form-control ${errors.username ? 'is-invalid' : ''}`} type="text" {...register('username')} placeholder="Enter userName" />
                </div>
                <div className="invalid-feedback">{errors.username?.message}</div>
                <div class="input-container">
                    <input name='password' className={`form-control ${errors.password ? 'is-invalid' : ''}`} type="password" {...register('password')} placeholder="Enter password" />
                </div>
                <div className="invalid-feedback">{errors.password?.message}</div>
                <button disabled={isSubmitting} className="btn btn-primary">
                    {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                    Login
                </button>
                <p class="signup-link">
                    No account?
                    <Link to="../register" className="btn btn-link">Register</Link>
                </p>
            </form>
        </div>
    )
}
