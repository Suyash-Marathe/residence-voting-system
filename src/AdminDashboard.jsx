import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

function AdminDashboard({ onLogout }) {
    const [polls, setPolls] = useState([]);
    const [comments, setComments] = useState([]);
    const [question, setQuestion] = useState('');
    const [optionA, setOptionA] = useState('');
    const [optionB, setOptionB] = useState('');

    useEffect(() => {
        fetchPolls();
        fetchComments();
    }, []);

    const fetchPolls = async () => {
        let { data, error } = await supabase.from('polls').select('*').order('id', { ascending: false });
        if (!error) setPolls(data);
    };

    const fetchComments = async () => {
        let { data, error } = await supabase.from('comments').select('*');
        if (!error) setComments(data);
    };

    const createPoll = async (e) => {
        e.preventDefault();
        const { error } = await supabase
            .from('polls')
            .insert([{ question, option_a: optionA, option_b: optionB }]);

        if (!error) {
            setQuestion(''); setOptionA(''); setOptionB('');
            fetchPolls();
        } else {
            console.error("Supabase Error:", error);
            alert(`Error: ${error.message}`);
        }
    };

    const deletePoll = async (id) => {
        await supabase.from('polls').delete().eq('id', id);
        fetchPolls();
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Admin Dashboard <button onClick={onLogout} style={{ float: 'right' }}>Logout</button></h2>

            <form onSubmit={createPoll} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
                <h3>Create New Poll</h3>
                <input placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} required />
                <input placeholder="Option A" value={optionA} onChange={(e) => setOptionA(e.target.value)} required />
                <input placeholder="Option B" value={optionB} onChange={(e) => setOptionB(e.target.value)} required />
                <button type="submit">Publish Poll</button>
            </form>

            <h3>Active Polls & Feedback</h3>
            {polls.map((poll) => (
                <div key={poll.id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '10px' }}>
                    <strong>{poll.question}</strong>
                    <p>{poll.option_a} ({poll.votes_a} votes) vs {poll.option_b} ({poll.votes_b} votes)</p>

                    <div style={{ background: '#f9f9f9', padding: '10px' }}>
                        <h4>User Comments:</h4>
                        <ul>
                            {comments.filter(c => c.poll_id === poll.id).length > 0 ? (
                                comments.filter(c => c.poll_id === poll.id).map(c => (
                                    <li key={c.id}>{c.text}</li>
                                ))
                            ) : (
                                <li style={{ borderLeft: 'none', background: 'transparent', boxShadow: 'none', color: '#a0aec0' }}>
                                    No comments yet.
                                </li>
                            )}
                        </ul>
                    </div>

                    <button onClick={() => deletePoll(poll.id)} style={{ color: 'red' }}>Delete Poll</button>
                </div>
            ))}
        </div>
    );
}

export default AdminDashboard;