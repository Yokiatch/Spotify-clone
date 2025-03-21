import axios from "axios";

const clientId = "64b087a47e504918af6d99949b7e60dc";
const clientSecret = "06ed06bf31b843d28eae3edb62ec0ac8";

const getToken = async () => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({ grant_type: "client_credentials" }),
    {
      headers: {
        Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data.access_token;
};

export { getToken };
