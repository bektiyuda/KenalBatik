import React from "react";
import { useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, errors } = useForm({
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/register");
    };

    return (
        <div>
            <h1>Register</h1>
            {Object.keys(errors).length > 0 && (
                <ul>
                    {Object.keys(errors).map((key) => (
                        <li key={key}>{errors[key]}</li>
                    ))}
                </ul>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={data.username}
                    onChange={(e) => setData("username", e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
