import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrorNotification = (message) => {
    toast.error(message, {
        position: "bottom-center",
        theme: "colored",
        pauseOnHover: false,
        autoClose: 1500,
        hideProgressBar: true,
        className: "error",
    });
};

export default ErrorNotification;
