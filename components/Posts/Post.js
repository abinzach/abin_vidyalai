import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const PostHeader = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderBottom: '1px solid #ccc',
}));

const AvatarBadge = styled.div(() => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: 'gray',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '10px',
  fontSize: '20px',
}));

const Username = styled.span(() => ({
  fontWeight: 'bold',
  fontSize: '15px',

}));

const Email = styled.span(() => ({
  color: '#777',
  fontSize: '13px',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
  scrollSnapType: 'x mandatory',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
  zIndex: 1,
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const Post = ({ post }) => {
  const [user, setUser] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [post.userId]);

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <PostContainer>
      <PostHeader>
        {user && (
          <>
            <AvatarBadge>{user.name
  .split(' ')
  .map(name => name.charAt(0)) // Get the first letter of each name
  .join('')}</AvatarBadge>
            <div style={{display:"flex",flexDirection:"column"}}>
              <Username>{user.name}</Username>
              <Email>{user.email}</Email>
            </div>
          </>
        )}
      </PostHeader>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
};

export default Post;
