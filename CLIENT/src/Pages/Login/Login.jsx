import { useForm } from "react-hook-form"
import { Input, Button } from "@nextui-org/react";
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import { EyeFilledIcon } from "../../Assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../Assets/EyeSlashFilledIcon";
import { useDispatch } from 'react-redux';
import { fetchLogin } from "../../Redux/Slice/AuthSlice";
const Login = () => {
    // variables
    const dispatch = useDispatch();
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;
    // hooks
    const [isShowPass, setIsShowPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        document.title = 'Đăng nhập';
    }, []);
    
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        mode: 'onSubmit',
    })
    // handles
    const onSubmit = (data) => {
        if (!data.email.match(regexEmail)) {
            return setError("email", { type: "invalidRegexEmail", message: `Email không hợp lệ` });
        }
        setIsLoading(true);
        dispatch(fetchLogin(data));
        setIsLoading(false);
    }
    const onError = errors => { console.log(`errors:::`, errors) }

    return (
        <div className="absolute top-[30%] left-[50%] mr-[-50%]  transform -translate-x-1/2 -translate-y-1/2 w-[300px]
         rounded-sm shadow-lg shadow-cyan-500/50">
            <div className="p-[10px] flex justify-center items-center flex-col ">
                <h1 className="font-[Quicksand] font-bold text-[24px]">Đăng nhập</h1>
                <form className="w-full">
                    <Input
                        isDisabled={isLoading}
                        label="Email"
                        className="mt-[20px] max-w-xs"
                        {...register("email", { required: "Vui lòng nhập email" })}
                        isInvalid={errors.email ? true : false}
                        errorMessage={errors.email && errors.email.message} />

                    <Input
                        isDisabled={isLoading}
                        type={isShowPass ? "text" : "password"}
                        label="Mật khẩu" className="mt-[20px] max-w-xs"
                        {...register("password", { required: `Vui lòng nhập mật khẩu` })}
                        isInvalid={errors.password ? true : false}
                        errorMessage={errors.password && errors.password.message}
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={() => { setIsShowPass(!isShowPass) }}>
                                {isShowPass ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        } />
                    <Button
                        isLoading={isLoading}
                        radius="sm"
                        className="mt-[20px] bg-[#3BB77E] text-white w-full p-[5px]"
                        onClick={handleSubmit(onSubmit, onError)} >Đăng nhập
                    </Button>
                </form>
                <h1 className="mt-[20px] text-[14px] font-[300]">Đã chưa có tài khoảng? <span className="cursor-pointer text-primary-500">
                    <NavLink to={'/signUp'}>Đăng kí</NavLink></span></h1>
            </div>
        </div>
    );
}

export default Login;

