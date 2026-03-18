const API_URL = "http://localhost:5001/api/v2/users";

const handleResponse = async (response) => {
  const data = await response.json(); // 👈 MUST

  if (!response.ok) {
    console.error("❌ Backend error:", data); // 👈 THIS WILL EXPOSE BUG
    throw new Error(data.message || "API request failed");
  }

  return data;
};

//get users with pagination

export const getUsers = async (page = 1, limit = 10) => {
  console.log("🚀 ~ getUsers ~ page:")
  
  const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
   console.log("🚀 ~ getUsers ~ response:", response)
   return handleResponse(response);
};

//search users by name or email

export const searchUsers = async (term = "", page = 1, limit = 5) => {
  const response = await fetch(
    `${API_URL}/search/${encodeURIComponent(term)}?page=${page}&limit=${limit}`,
  );
   return handleResponse(response);
};

//get status

export const getStatus = async () => {
  const response = await fetch(`${API_URL}/status`);
   console.log("🚀 ~ getStatus ~ response:", response)
   return handleResponse(response);
};

//add new user

export const addUser = async (data) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
   headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
 return handleResponse(response);
};

//update existin user

export const updateUser = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

   return handleResponse(response);
};


//Delete user

export const deleteUser = async(id)=>{
    const response=await fetch(`${API_URL}/${id}`,{method:"DELETE"})
     return handleResponse(response);
}
