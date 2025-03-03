import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const EditItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        creator: '',
        category: '',
        tags: '',
        image: null,
    });

    useEffect(() => {
        const fetchItem = async () => {
            const res = await fetch(`http://localhost:3000/api/artworks/${id}`);
            if (res.ok) {
                const data = await res.json();
                setFormData({
                    title: data.title,
                    description: data.description,
                    creator: data.creator,
                    category: data.category,
                    tags: Array.isArray(data.tags) ? data.tags.join(', ') : '', // Join for input field
                    image: null, // No file preloaded
                });
            }
        };

        fetchItem();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            if (key === 'tags') {
                data.append(key, formData[key].split(',').map(t => t.trim()));
            } else {
                if (formData[key] !== null) data.append(key, formData[key]);
            }
        }

        const res = await fetch(`http://localhost:3000/api/artworks/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: data,
        });

        if (res.ok) {
            alert('Artwork updated!');
            navigate('/');
        } else {
            alert('Failed to update artwork.');
        }
    };

    return (
        <>
            <Header />
            <div className="p-4 max-w-md mx-auto mt-10 bg-gray-200 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Edit Artwork</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="title" value={formData.title} onChange={handleChange} className="border p-2 w-full bg-white" placeholder="Title" />
                    <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 w-full bg-white" placeholder="Description" />
                    <input name="creator" value={formData.creator} onChange={handleChange} className="border p-2 w-full bg-white" placeholder="Creator Name" />
                    <input name="category" value={formData.category} onChange={handleChange} className="border p-2 w-full bg-white" placeholder="Category" />
                    <input name="tags" value={formData.tags} onChange={handleChange} className="border p-2 w-full bg-white" placeholder="Tags (comma separated)" />
                    <input type="file" onChange={handleFileChange} className="p-2 w-full bg-white" />
                    <button type="submit" className="bg-green-500 text-white p-2 rounded">Update</button>
                </form>
            </div>
        </>
    );
};

export default EditItem;

