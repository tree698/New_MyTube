import React, { useEffect, useState } from 'react';
import { BsYoutube, BsSearch } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function SearchHeader() {
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const { keyword } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/videos/${text}`);
  };

  useEffect(() => setText(keyword || ''), [keyword]);

  return (
    <header>
      <Link to="/">
        <BsYoutube />
        <h1>New MyTube</h1>
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Search..."
        />
        <button>
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
