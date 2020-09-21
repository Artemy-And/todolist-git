import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {useFormik} from "formik";
import {loginTC} from "./auth-reducer";





export const Login = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const formik = useFormik({
        validate :(values: any) => {
            const errors: any = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },

        // validate:(values) => {
        //     if (!values.email){
        //         return {
        //             email:'not correct email'
        //         }
        //     }
        //     if (!values.password){
        //         return {
        //             email:'not correct password'
        //         }
        //     }
        // },
            initialValues: {
                email: '',
                password:'',
                rememberMe:false
            },
            onSubmit: values => {
            dispatch(loginTC(values))
            },
        })
    if (isLoggedIn){
        return <Redirect to={'/'}/>
    }


    return (<Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}>here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>

                <FormGroup>
                    <TextField
                        label="Email"
                        margin="normal"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                    <TextField
                        type="password"
                        label="Password"
                        margin="normal"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                    <FormControlLabel
                        label={'Remember me'}
                        control={<Checkbox
                            {...formik.getFieldProps('RememberMe')}/>}
                        checked={formik.values.rememberMe}

                    />
                    <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                </FormGroup>
            </FormControl>
            </form>
        </Grid>
    </Grid>)
}
