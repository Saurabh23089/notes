import { useState, useEffect } from "react";
import { BASE_URL } from "../config/appConfig.js";
import axios from "axios";

export default function Homepage() {
    const [notes, setNotes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ title: "", content: "" });

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/notes/get-all-notes`);
            setNotes(res?.data?.data?.notes || []);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => {
        setFormData({ title: "", content: "" });
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("content", formData.content);

            await axios.post(`${BASE_URL}/api/v1/notes/add-note`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            fetchNotes();
            setFormData({ title: "", content: "" });
            setShowForm(false);
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-center mb-6 mt-16">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={() => setShowForm(true)}
                    >
                        + Add New Note
                    </button>
                </div>

                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
                        >
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Note</h2>
                            <input
                                name="title"
                                type="text"
                                placeholder="Note Title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
                            />
                            <textarea
                                name="content"
                                placeholder="Note Content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full mb-3 px-3 py-2 border border-gray-300 rounded resize-none"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Add Note
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="grid gap-4">
                    {notes.length === 0 ? (
                        <p className="text-gray-500 text-center">No notes available.</p>
                    ) : (
                        notes.map((note) => (
                            <div key={note?.id} className="bg-white p-4 rounded shadow w-1/2 text-wrap">
                                <h2 className="text-lg font-semibold text-gray-800">{note?.note_title ?? ""}</h2>
                                <p className="text-gray-700 break-words whitespace-pre-wrap">
                                    {note?.note_content ?? ""}
                                </p>

                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

