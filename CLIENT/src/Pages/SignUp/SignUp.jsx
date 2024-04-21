import { useForm } from "react-hook-form"
import { Input, Button } from "@nextui-org/react";
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { EyeFilledIcon } from "../../Assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../Assets/EyeSlashFilledIcon";
import { signUp } from "../../Services/access.service"
import { toast } from 'react-toastify';

const SignUp = () => {
    const navigate = useNavigate();
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i
    const regexName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
    // const regexPhoneNumberVN = /(84|0[3|5|7|8|9])+([0-9]{9})\b/g

    // HOOK
    const [isShowPass, setIsShowPass] = useState(false);
    const [isShowRePass, setIsShowRePass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        document.title = 'Đăng kí';
    }, [])
    // FETCH API
    const fetchSignUp = async (payload) => {
        const res = await signUp(payload);
        setIsLoading(false);
        console.log(res);
        if (res?.status === 200) {
            toast.success("Đăng kí thành thông");
            navigate('/login');
            return;
        }
        toast.error('Tài khoảng đã tồn tại')
    }
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        mode: 'onSubmit'
    })

    const onSubmit = (data) => {
        // if (!data.phone.match(regexPhoneNumberVN)) {
        //     return setError("phone", { type: "invalidRegexEmail", message: `Số điện thoại không hợp lệ` });
        // }
        if (!data.name.match(regexName)) {
            return setError("name", { type: "invalidName", message: `Tên người dùng không hợp lệ` });
        }
        if (!data.email.match(regexEmail)) {
            return setError("email", { type: "invalidRegexEmail", message: `Email không hợp lệ` });
        }
        if (!(data.password === data.rePassword)) {
            return setError("rePassword", { type: "invalidAccessPassword", message: `Mật khẩu không trùng` });
        }
        setIsLoading(true);
        fetchSignUp(data);
    }
    const onError = errors => { console.log(`errors:::`, errors) }

    return (
        <div className="absolute top-[30%] left-[50%] mr-[-50%]  transform -translate-x-1/2 -translate-y-1/2 w-[300px]
         rounded-sm shadow-lg shadow-cyan-500/50">
            <div className="p-[10px] flex justify-center items-center flex-col ">
                <h1 className="font-[Quicksand] font-bold text-[24px]">Đăng kí</h1>
                <form className="w-full"  >
                    <Input
                        isDisabled={isLoading}
                        label="Tên người dùng"
                        className="mt-[20px] max-w-xs"
                        {...register("name", { required: "Vui lòng nhập tên" })}
                        isInvalid={errors.name ? true : false}
                        errorMessage={errors.name && errors.name.message} />
                    <Input
                        isDisabled={isLoading}
                        label="Email"
                        className="mt-[20px] max-w-xs"
                        {...register("email", { required: "Vui lòng nhập email" })}
                        isInvalid={errors.email ? true : false}
                        errorMessage={errors.email && errors.email.message} />

                    {/* <Input
                        type="number" label="SĐT" className="mt-[20px] "
                        {...register("phone", { required: "Vui lòng nhập số điện thoại" })}
                        isInvalid={errors.phone ? true : false}
                        errorMessage={errors.phone && errors.phone.message} /> */}

                    <Input
                        isDisabled={isLoading}
                        type={isShowPass ? "text" : "password"}
                        label="Mật khẩu" className="mt-[20px]"
                        {...register("password", { required: "Vui lòng nhập mật khẩu" })}
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
                        }
                    />

                    <Input
                        isDisabled={isLoading}
                        type={isShowRePass ? "text" : "password"}
                        label="Xác nhận mật khẩu" className="mt-[20px]"
                        {...register("rePassword", { required: "Vui lòng nhập mật khẩu" })}
                        isInvalid={errors.rePassword ? true : false}
                        errorMessage={errors.rePassword && errors.rePassword.message}
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={() => { setIsShowRePass(!isShowRePass) }}>
                                {isShowRePass ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                    />

                    <Button radius="sm" className="mt-[20px] bg-[#3BB77E] text-white w-full p-[5px]"
                        onClick={handleSubmit(onSubmit, onError)}
                        isLoading={isLoading}
                    >Tạo mới</Button>
                </form>
                <h1 className="mt-[20px] text-[14px] font-[300]">Đã có tài khoảng? <span className="cursor-pointer text-primary-500">
                    <NavLink to={'/login'}>Đăng nhập</NavLink></span></h1>
            </div>
        </div>
    );
}
export default SignUp;
