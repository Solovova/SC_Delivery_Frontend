import axios from "axios";

const http = axios.create({
    baseURL: "https://localhost:5001/api/1.0",
    headers: {
        "Content-type": "application/json"
    }
});
export default http