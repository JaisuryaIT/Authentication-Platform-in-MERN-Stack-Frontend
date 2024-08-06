import { useMessage } from '../context/MessageContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { message, setMessage } = useMessage(); // Get and set message from context
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove JWT token from local storage
    setMessage('Logged out successfully'); // Set the logout success message
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4">Home</h2>
        {message && <p className="text-green-500">{message}</p>}
        <button onClick={handleLogout} className="w-full bg-red-500 text-white p-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
