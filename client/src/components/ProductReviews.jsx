import React, { useState } from 'react';
import { FiStar, FiUser, FiCalendar, FiThumbsUp } from 'react-icons/fi';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([
    {
      id: '1',
      productId: '1',
      userName: 'Sarah Mitchell',
      rating: 5,
      title: 'Absolutely stunning!',
      comment: 'This sofa exceeded all my expectations. The velvet is luxurious and the gold legs add the perfect touch of elegance.',
      date: '2026-02-10',
      helpful: 12,
      verified: true
    },
    {
      id: '2',
      productId: '1',
      userName: 'James Rodriguez',
      rating: 4,
      title: 'Great quality, worth the price',
      comment: 'Very comfortable and well-made. Took a bit longer to arrive but totally worth the wait.',
      date: '2026-02-08',
      helpful: 8,
      verified: true
    },
    {
      id: '3',
      productId: '1',
      userName: 'Emily Chen',
      rating: 5,
      title: 'Perfect for my living room',
      comment: 'The color is exactly as shown. Assembly was straightforward and the cushioning is perfect.',
      date: '2026-02-05',
      helpful: 15,
      verified: false
    }
  ]);

  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: ''
  });

  const [showForm, setShowForm] = useState(false);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const review = {
      id: Date.now().toString(),
      productId,
      userName: 'Guest User',
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      verified: false
    };
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, title: '', comment: '' });
    setShowForm(false);
  };

  const handleHelpful = (reviewId) => {
    setReviews(reviews.map(r => 
      r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
    ));
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100 
      : 0
  }));

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-[#1E1E1E] border border-[#333] rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-5xl font-light text-white">{averageRating}</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={i < Math.round(averageRating) ? 'fill-[#C5A059] text-[#C5A059]' : 'text-gray-600'}
                    size={20}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-400 text-sm">Based on {reviews.length} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ star, count, percentage }) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm text-gray-400 w-12">{star} star</span>
                <div className="flex-1 h-2 bg-[#0b0b0b] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#C5A059] transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-6 w-full md:w-auto px-6 py-3 bg-[#C5A059] text-black font-medium rounded-lg hover:bg-[#d4b06a] transition-colors"
        >
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="bg-[#1E1E1E] border border-[#333] rounded-lg p-6">
          <h3 className="text-xl text-white font-medium mb-4">Write Your Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Rating */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Rating *</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="transition-transform hover:scale-110"
                  >
                    <FiStar
                      className={star <= newReview.rating ? 'fill-[#C5A059] text-[#C5A059]' : 'text-gray-600'}
                      size={32}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Review Title *</label>
              <input
                type="text"
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                required
                className="w-full bg-[#0b0b0b] border border-[#333] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#C5A059] transition-colors"
                placeholder="Sum up your experience"
              />
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Your Review *</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                required
                rows={4}
                className="w-full bg-[#0b0b0b] border border-[#333] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#C5A059] transition-colors resize-none"
                placeholder="Share your thoughts about this product..."
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#C5A059] text-black font-medium rounded-lg hover:bg-[#d4b06a] transition-colors"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-xl text-white font-medium">Customer Reviews</h3>
        {reviews.map((review) => (
          <div key={review.id} className="bg-[#1E1E1E] border border-[#333] rounded-lg p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C5A059]/20 rounded-full flex items-center justify-center">
                  <FiUser className="text-[#C5A059]" size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{review.userName}</span>
                    {review.verified && (
                      <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FiCalendar size={14} />
                    <span>{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={i < review.rating ? 'fill-[#C5A059] text-[#C5A059]' : 'text-gray-600'}
                    size={16}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <h4 className="text-white font-medium mb-2">{review.title}</h4>
            <p className="text-gray-300 mb-4">{review.comment}</p>

            {/* Footer */}
            <div className="flex items-center gap-4 pt-3 border-t border-[#333]">
              <button
                onClick={() => handleHelpful(review.id)}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#C5A059] transition-colors"
              >
                <FiThumbsUp size={16} />
                <span>Helpful ({review.helpful})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
