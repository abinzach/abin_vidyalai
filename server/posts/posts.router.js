const express = require('express');
const axios = require('axios').default;
const { fetchPosts } = require('./posts.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts();

    // Fetch images for each post
    const postsWithImages = await Promise.all(
      posts.map(async (post) => {
        const { data: photos } = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
        console.log("photos",photos)
        const images = photos.map((photo) => ({ url: photo.url }));

        return {
          ...post,
          images: images.slice(0, 3), // Limiting to first 3 images for each post
        };
      })
    );

    res.json(postsWithImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching posts and images.' });
  }
});

module.exports = router;
