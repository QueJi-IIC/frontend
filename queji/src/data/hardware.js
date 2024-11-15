const getHardwareData = (client_id, client_secret, store_id, created_at) => {
    return {
        client_id, client_secret, store_id, created_at
    }
}

const postHardwareData = async (store_id, auth_token) => { // Get the current timestamp
  try {
    const response = await fetch(`http://localhost:5500/hardware/${store_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth_token
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Hardware data posted successfully:", data);
    return data;
  } catch (error) {
    console.error("Error posting hardware data:", error);
    throw error;
  }
};

export {postHardwareData}