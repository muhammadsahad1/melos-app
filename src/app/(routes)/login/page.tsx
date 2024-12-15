import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormEvent } from "react";
import api from "@/app/lib/api";
import { ILogin } from "@/app/types/user";

const page = () => {

    const router = useRouter()

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    const onSumbit: SubmitHandler<ILogin> = async (data) => {
        try {

            const response = await api.post('/auth', { type: "login", email: data.email, password: data.password })

            if (response.data.success) {
                // router('')
            }

        } catch (error) {

        }
    }

    return (
        <div>page</div>
    )
}

export default page