Const API_URL = "http://localhost:5000/api/users";

//get users with pagination

export const getUsers = async (page = 1, limit = 10) => {
    const response=await fetch(`${API_URL}?page=${page}&limit=${limit}`)
    if(!response.ok){
        throw new Error("Failed to fetch users")
    }
    return response.json();
};