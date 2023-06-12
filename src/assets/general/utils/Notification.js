import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = (message, type) => {
    if (type === "error") {
        toast.error(message, {
            position: "bottom-center",
            theme: "colored",
            pauseOnHover: false,
            autoClose: 1500,
            hideProgressBar: true,
            className: "error",
        });
    }

    if (type === "success") {
        toast.success(message, {
            position: "bottom-center",
            theme: "colored",
            pauseOnHover: false,
            autoClose: 1500,
            hideProgressBar: true,
            className: "success",
        });
    }
};

export default Notification;
