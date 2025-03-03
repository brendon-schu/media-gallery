import { Link } from 'react-router-dom';

const isLoggedIn = !!localStorage.getItem('authToken');
const apiURL = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');
const uploadsURL = import.meta.env.VITE_UPLOADS_URL.replace(/\/$/, '');

const ThumbnailCard = ({ item, onClick }) => (
    <div className="relative border rounded p-2 shadow hover:shadow-lg cursor-pointer" onClick={onClick}>
        <img src={`${uploadsURL}${item.image_path}`} alt={item.title} className="w-full h-48 object-cover rounded" />
        <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
        <p className="text-sm text-gray-500">{item.creator} - {item.date}</p>
        {isLoggedIn && (
        <Link to={`/edit/${item.id}`} className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded z-50" onClick={(e) => e.stopPropagation()}>
            Edit
        </Link>
        )}
    </div>
);

export default ThumbnailCard;

