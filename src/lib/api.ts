import axios from "axios";

console.log(`" => base url", ${process.env.NEXT_PUBLIC_API_BASE_URL}`)

const api = axios.create({
    baseURL: "http://localhost:3000/api/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    },
})

// will add interceptor for request/response handling

export default api