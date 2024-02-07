import axios from 'axios';
//Let's create a global axios instance
export const axiosInstance = axios.create({
headers: {
'Content-Type': 'application/json',
}
});
