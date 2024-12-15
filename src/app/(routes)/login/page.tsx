"use client"

import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormEvent, useState } from "react";
import api from "@/lib/api";
import { ILogin } from "@/app/types/user";
import toast from "react-hot-toast";
import { LoginFormDemo } from "@/app/components/forms/LoginUpFormDemo";

const page = () => {

    // const router = useRouter()
   

    return (
        <div className="login-container my-14"><LoginFormDemo /></div>
    )
}

export default page