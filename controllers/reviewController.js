import { Review, User } from "../models/models.js";

export const createReview = async (req, res) => {
    try {
        const { customerId, orderId, itemId, rating, description } = req.body;

        const newReview = await Review.create({
            customerId,
            orderId,
            itemId,
            rating,
            description,
        });

        res.status(201).json(newReview);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const getReviews = async (req, res) => {
    try {
        let reviews = await Review.findAll();

        // get review author name
        reviews = await Promise.all(reviews.map(async (review) => {
            const author = await User.findOne({ where: { userId: review.customerId } });
            review.dataValues.author = author.firstName + " " + author.lastName;
            return review;
        }));

        res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Review.findOne({ where: { id } });
        if (!review) {
            res.status(404).json({ message: "Review not found" });
        } else {
            await review.destroy();
            res.status(200).json({ message: "Review deleted" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};