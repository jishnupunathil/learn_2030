const API_URL = "http://localhost:5000/api/users";

//get users with pagination

export const getUsers = async (page = 1, limit = 10) => {
    const response=await fetch(`${API_URL}?page=${page}&limit=${limit}`)
    if(!response.ok){
        throw new Error("Failed to fetch users")
    }
    return response.json();
};

//search users by name or email

export const searchUsers=async(term='',page=1,limit=5)=>{
    const response=await fetch(
        `${API_URL}/search/${encodeURIComponent(term)}?page=${page}&limit=${limit}`
    )
    if(!response.ok) throw new Error ("Failed to search user")

    return response.json()
}