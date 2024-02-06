import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-center items-center p-2">
      <img
        src="https://itu.edu.pk/wp-content/uploads/2022/11/Updated-ITU-logo.jpg "
        className="h-20"
        alt="logo"
        onClick={() => navigate("/")}
      />
    </nav>
  );
};

export default NavBar;
