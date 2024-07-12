const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

// Assicurati che Cloudinary sia configurato correttamente
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

router.get('/images', async (req, res) => {
    try {

        const imageIds = [
            '2fa9c674a6150ce991d7ca546241461b',
            '664a2876164e98ebe337507f959fcd81',
            '73a088a89f77443a32c613138fd4b2a5',
            '563fceacb6ed019214f78a4e60676ab1'
        ];

        const imageUrls = await Promise.all(imageIds.map(async (id) => {
            const result = await cloudinary.api.resource_by_asset_id(id);
            return result.secure_url;
        }));

        res.json(imageUrls);
    } catch (error) {
        console.error('Error fetching images from Cloudinary:', error);
        res.status(500).send('Error fetching images');
    }
});

module.exports = router;