export const logoutController = (req, res) => {
    try {
        // Clear the auth_token cookie
        res.clearCookie("auth_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // This only applies in production
            sameSite: "strict", // Helps prevent CSRF
        });

        // Respond with a success message
        console.log("Cookie cleared");
        return res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
