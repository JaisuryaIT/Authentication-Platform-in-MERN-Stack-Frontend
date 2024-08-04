import { useMessage } from '../context/MessageContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { message } = useMessage(); // Get message from context
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4">Home</h2>
        {message && <p className="text-green-500">{message}</p>}
        <button onClick={() => navigate('/logout')} className="w-full bg-red-500 text-white p-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
