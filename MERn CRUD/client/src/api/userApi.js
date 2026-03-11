const API_URL = "http://localhost:5000/api/users";

//get users with pagination

export const getUsers = async (page = 1, limit = 10) => {
  const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

//search users by name or email

export const searchUsers = async (term = "", page = 1, limit = 5) => {
  const response = await fetch(
    `${API_URL}/search/${encodeURIComponent(term)}?page=${page}&limit=${limit}`,
  );
  if (!response.ok) throw new Error("Failed to search user");

  return response.json();
};

//get status

export const getStats = async () => {
  const response = await fetch(`${API_URL}/stats`);
  if (!response.ok) throw new Error("Failed to search users");
  return response.json();
};

//add new user

export const addUser = async (data) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to add user");
  return response.json();
};

//update existin user

export const updateUser = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to update user");
  return response.json();
};


//Delete user

export const deleteUser = async(id)=>{
    const response=await fetch(`${API_URL}/${id}`,{method:"Delete"})
    if (!response.ok) throw new Error("Failed to update user");
  return response.json();
}
