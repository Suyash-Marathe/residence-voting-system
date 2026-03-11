import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

function UserDashboard({ onLogout }) {
    const [polls, setPolls] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        fetchPolls();
        fetchComments();
    }, []);

    const fetchPolls = async () => {
        let { data } = await supabase.from('polls').select('*').order('id', { ascending: false });
        if (data) setPolls(data);
    };

    const fetchComments = async () => {
        let { data } = await supabase.from('comments').select('*');
        if (data) setComments(data);
    };

    const castVote = async (pollId, currentVotes, optionColumn) => {
        const { error } = await supabase
            .from('polls')
            .update({ [optionColumn]: currentVotes + 1 })
            .eq('id', pollId);

        if (!error) fetchPolls();
    };

    const addComment = async (pollId) => {
        if (!newComment) return;
        const { error } = await supabase
            .from('comments')
            .insert([{ poll_id: pollId, text: newComment }]);

        if (!error) {
            setNewComment('');
            fetchComments();
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Society Member Dashboard <button onClick={onLogout} style={{ float: 'right' }}>Logout</button></h2>

            {polls.map((poll) => (
                <div key={poll.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
                    <h3>{poll.question}</h3>

                    <div style={{ marginBottom: '15px' }}>
                        <button onClick={() => castVote(poll.id, poll.votes_a, 'votes_a')}>
                            Vote: {poll.option_a} ({poll.votes_a})
                        </button>
                        <span style={{ margin: '0 10px' }}>OR</span>
                        <button onClick={() => castVote(poll.id, poll.votes_b, 'votes_b')}>
                            Vote: {poll.option_b} ({poll.votes_b})
                        </button>
                    </div>

                    <div style={{ background: '#f9f9f9', padding: '10px' }}>
                        <h4>Comments:</h4>
                        <ul>
                            {comments.filter(c => c.poll_id === poll.id).map(c => (
                                <li key={c.id}>{c.text}</li>
                            ))}
                        </ul>
                        <input
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button onClick={() => addComment(poll.id)}>Post</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default UserDashboard;