mport axios from "axios";
import instanceInterceptor from "./interceptorService";

const apiAxiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
});

class instance {
    static apiInstance() {
        instanceInterceptor.responseInterceptor(apiAxiosInstance);
        instanceInterceptor.requestInterceptor(apiAxiosInstance);
        return apiAxiosInstance;
    }
}

export default instance; 