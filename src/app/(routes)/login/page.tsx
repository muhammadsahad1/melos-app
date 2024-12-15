import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormEvent, useState } from "react";
import api from "@/app/lib/api";
import { ILogin } from "@/app/types/user";
import toast from "react-hot-toast";

const page = () => {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    const onSumbit: SubmitHandler<ILogin> = async (data) => {
        try {
            setLoading(true)
            const response = await api.post('/auth', { type: "login", email: data.email, password: data.password })

            if (response.data.message === "Login successful") {
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
        <div>page</div>
    )
}

export default page