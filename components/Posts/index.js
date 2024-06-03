import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { useWindowWidthContext } from '../../context/WindowWidthContext';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { isSmallerDevice } = useWindowWidthContext(); // state being called from context
  const limit = isSmallerDevice ? 5 : 10;

  const fetchPosts = async (page) => {
    const { data: newPosts } = await axios.get('/api/v1/posts', {
      params: { start: page * limit, limit },
    });
    return newPosts;
  };

  useEffect(() => {
    const initialFetch = async () => {
      const initialPosts = await fetchPosts(0);
      setPosts(initialPosts);
      setPage(1);
      setHasMore(initialPosts.length === limit);
    };

    initialFetch();
  }, [isSmallerDevice, limit]);

  const handleLoadMore = async () => {
    setIsLoading(true);
    const newPosts = await fetchPosts(page);
    setPosts(prevPosts => [...prevPosts, ...newPosts]);
    setPage(prevPage => prevPage + 1);
    setHasMore(newPosts.length === limit);
    setIsLoading(false);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {hasMore && (
          <LoadMoreButton onClick={handleLoadMore} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        )}
      </div>
    </Container>
  );
}
