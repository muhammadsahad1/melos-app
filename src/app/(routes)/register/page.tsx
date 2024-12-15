import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormEvent, useState } from "react";
import api from "@/app/lib/api";
import { IRegister } from "@/app/types/user";
import toast from "react-hot-toast";

const page = () => {

    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<IRegister>()

    const onSumbit: SubmitHandler<IRegister> = async (data) => {
        try {
            setLoading(true)
            const response = await api.post('/auth', { type: "register", username: data.username, email: data.email, password: data.password })

            if (response.data.message === "Registration successful") {
                router.push('/home')
            } else {
                toast.error(response.data.error)
            }
            setLoading(false)
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <div>Register</div>
    )
}

export default page