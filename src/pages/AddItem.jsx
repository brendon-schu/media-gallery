import { useState } from "react";
import Header from "../components/Header";

const AddItem = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        creator: '',
        category: '',
        tags: '',
		date: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
		data.append('date', new Date().toISOString().split('T')[0]);
        for (const key in formData) {
            // Split tags into array if needed, otherwise send normally
            data.append(key, key === 'tags' ? formData[key].split(',').map(t => t.trim()) : formData[key]);
        }

        const res = await fetch('http://localhost:3000/api/artworks', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: data,
        });

        if (res.ok) {
            alert('Artwork added successfully!');
            setFormData({ title: '', description: '', creator: '', category: '', tags: '', image: null });
        } else {
            alert('Failed to add artwork.');
        }
    };

    return (
        <>
            <Header />
            <div className="p-4 max-w-md mx-auto mt-10 bg-gray-200 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Add New Artwork</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="title" value={formData.title} onChange={handleChange} className="border border-gray-400 bg-white p-2 w-full" placeholder="Title" />
                    <textarea name="description" value={formData.description} onChange={handleChange} className="border border-gray-400 bg-white p-2 w-full" placeholder="Description" />
                    <input name="creator" value={formData.creator} onChange={handleChange} className="border border-gray-400 bg-white p-2 w-full" placeholder="Creator Name" />
                    <input name="category" value={formData.category} onChange={handleChange} className="border border-gray-400 bg-white p-2 w-full" placeholder="Category" />
                    <input name="tags" value={formData.tags} onChange={handleChange} className="border border-gray-400 bg-white p-2 w-full" placeholder="Tags (comma separated)" />
                    <input type="file" onChange={handleFileChange} className="p-2 w-full" />
                    <button type="submit" className="bg-green-500 text-white p-2 rounded">Submit</button>
                </form>
            </div>
        </>
    );
};

export default AddItem;

