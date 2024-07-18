"use client"

import { useRouter } from "next/navigation"
import React, { useState } from "react"


const UserForm = () => {

    const router = useRouter()
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState("")


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorMessage("")
        const res = await fetch("/api/Users", {
            method: "POST",
            body: JSON.stringify({ formData }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            const response = await res.json();
            setErrorMessage(response.message);
        } else {
            router.refresh();
            router.push("/");
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-center gap-4 w-1/2"
                method="post"
            >
                <h1>Create New User</h1>

                <label htmlFor="name">Full Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    required={true}
                    value={formData.name}
                    className="m-2 bg-slate-400 rounded"
                />

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    name="email"
                    onChange={handleChange}
                    required={true}
                    value={formData.email}
                    className="m-2 bg-slate-400 rounded"
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    required={true}
                    value={formData.password}
                    className="m-2 bg-slate-400 rounded"
                />

                <input
                    type="submit"
                    value="Create User"
                    className="bg-blue-300 hover:bg-blue-500"
                />

            </form>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </>
    )

};

export default UserForm;