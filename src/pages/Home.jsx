import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ThumbnailCard from '../components/ThumbnailCard';
import Header from '../components/Header';

const Home = () => {
    const [artworks, setArtworks] = useState([]);
    const [openItem, setOpenItem] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

	const fetchFilteredArtworks = async () => {
		const params = new URLSearchParams();

		if (selectedCategory) params.append('categories', selectedCategory);
		if (selectedTags.length > 0) params.append('tags', selectedTags.join(','));

		const res = await fetch(`http://localhost:3000/api/artworks?${params.toString()}`);
		const data = await res.json();
		setArtworks(data);  // Assuming you already have setArtworks
	};

	const fetchCategories = async () => {
		const res = await fetch('http://localhost:3000/api/categories');
		const data = await res.json();
		setCategories(data);
	};

	const fetchTags = async () => {
		const res = await fetch('http://localhost:3000/api/tags');
		const data = await res.json();
		setTags(data);
	};

    const openOverlay = (item) => {
        navigate(`/artwork/${item.id}`);
        setOpenItem(item);
    };

    const closeOverlay = () => {
        navigate('/');
        setOpenItem(null);
    };

    const clearFilters = () => {
        setSelectedTags([]);
        setSelectedCategory("");
    }

	useEffect(() => {
		fetchCategories();
		fetchTags();
		fetchFilteredArtworks();
	}, []);

	useEffect(() => {
		fetchFilteredArtworks();
	}, [selectedCategory, selectedTags]);

    // Fetch artworks on load
	/*
    useEffect(() => {
        const fetchArtworks = async () => {
            const res = await fetch('http://localhost:3000/api/artworks');
            const data = await res.json();
            setArtworks(data);
        };
        fetchArtworks();
    }, []);
	*/

    // When data is loaded and there's an ID in the URL, open the correct item
    useEffect(() => {
        if (id && artworks.length > 0) {
            const item = artworks.find(item => item.id === parseInt(id));
            setOpenItem(item || null);
        } else {
            setOpenItem(null);  // Ensure overlay closes if no ID
        }
    }, [id, artworks]);

    return (
        <>
            <Header />

			<div className="p-4 text-center space-x-8">
				<select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
					<option value="">Categories</option>
					{categories.map(cat => (
						<option key={cat} value={cat}>{cat}</option>
					))}
				</select>
				<select value={selectedTags} onChange={e => setSelectedTags([...e.target.selectedOptions].map(o => o.value))}>
					<option value="">Tags</option>
					{tags.map(tag => (
						<option key={tag} value={tag}>{tag}</option>
					))}
				</select>
                <button onClick={clearFilters} className="bg-gray-400 p-2 rounded-lg text-white">Clear Filters</button>
			</div>

            <div className="p-4 grid grid-cols-3 gap-4">
                {artworks.map((art) => (
                    <ThumbnailCard key={art.id} item={art} onClick={() => openOverlay(art)} />
                ))}
            </div>

			
            {/* Overlay Panel */}
            {openItem && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex z-50">
                    {/* Left: Full-size image container */}
                    <div className="flex-1 flex items-center justify-center">
                        <img src={`http://localhost:3000${openItem.image_path}`} alt={openItem.title} className="max-w-full max-h-full object-contain" />
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-80 bg-white p-4 overflow-y-auto relative shadow-lg">
                        <button className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded" onClick={closeOverlay}>X</button>
                        <h2 className="text-2xl font-bold mb-2">{openItem.title}</h2>
                        <p className="mb-2">{openItem.description}</p>
                        <p className="text-sm text-gray-500 mb-2">{openItem.creator}</p>
                        <p className="text-sm text-gray-500">{openItem.date}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;

