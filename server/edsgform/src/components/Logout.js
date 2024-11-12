import { useNavigate } from "react-router-dom";


const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const fetchData = await fetch('http://localhost:8080/apps/auth/logout', {
                method: "POST", // Ensure the method is POST
                credentials: 'include',
            });
    
            const data = await fetchData.json();
          
    
            console.log("mydata",data.success); // Log the response to see what's returned
            
            if (data.success) {
                navigate("/login");
            } else {
                console.error("Logout failed:", data.message);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };
    


    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
