
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ThumbsUp, Flag } from "lucide-react";

// Mock reviews data
const mockReviews = [
  {
    id: "r1",
    userName: "Rajesh Kumar",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    date: "12 Apr 2023",
    reviewText: "Excellent service and product quality. The thermometer I purchased is very accurate and reliable. The vendor also provided detailed instructions on how to use it properly.",
    helpful: 24,
    verified: true
  },
  {
    id: "r2",
    userName: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 4,
    date: "28 Feb 2023",
    reviewText: "Good products with competitive pricing. Delivery was prompt and packaging was secure. The customer service representative was very helpful in guiding me to choose the right blood pressure monitor for my mother.",
    helpful: 17,
    verified: true
  },
  {
    id: "r3",
    userName: "Ankit Patel",
    avatar: "https://i.pravatar.cc/150?img=9",
    rating: 5,
    date: "15 Jan 2023",
    reviewText: "I've been buying medical equipment from MediTech for over 2 years now. Their quality is consistently good and after-sales service is excellent. Highly recommended vendor for healthcare professionals.",
    helpful: 32,
    verified: true
  },
  {
    id: "r4",
    userName: "Sunita Desai",
    avatar: "https://i.pravatar.cc/150?img=10",
    rating: 3,
    date: "05 Dec 2022",
    reviewText: "Products are good but delivery took longer than expected. The pulse oximeter works well but the battery life could be better. Overall satisfied with the purchase though.",
    helpful: 8,
    verified: false
  },
];

interface VendorReviewsProps {
  vendorId: string;
}

const VendorReviews: React.FC<VendorReviewsProps> = ({ vendorId }) => {
  // In a real application, fetch reviews based on vendorId
  const reviews = mockReviews;

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
  // Count ratings by star value
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach(review => {
    ratingCounts[review.rating - 1]++;
  });
  
  // Calculate rating percentages
  const ratingPercentages = ratingCounts.map(count => (count / reviews.length) * 100);

  const renderRatingStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
                  <span className="text-3xl font-bold text-gray-900 mr-2">{averageRating.toFixed(1)}</span>
                  <div className="flex">
                    {renderRatingStars(Math.round(averageRating))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">Based on {reviews.length} reviews</span>
              </div>
              
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center">
                    <div className="flex items-center mr-2 w-20">
                      <span className="text-sm text-gray-700 mr-1">{star}</span>
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    </div>
                    <div className="flex-grow h-2.5 bg-gray-200 rounded-full">
                      <div 
                        className="h-2.5 bg-yellow-400 rounded-full" 
                        style={{ width: `${ratingPercentages[star - 1]}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 ml-2 w-16">
                      {ratingCounts[star - 1]} ({Math.round(ratingPercentages[star - 1])}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={review.avatar} alt={review.userName} />
                  <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{review.userName}</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex mr-2">
                          {renderRatingStars(review.rating)}
                        </div>
                        <span className="text-xs text-gray-500">
                          {review.date}
                          {review.verified && (
                            <span className="ml-2 text-green-600">✓ Verified Purchase</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-gray-700">{review.reviewText}</p>
                  
                  <div className="flex items-center mt-4">
                    <button className="flex items-center text-gray-500 text-sm hover:text-blue-600">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({review.helpful})
                    </button>
                    <button className="flex items-center text-gray-500 text-sm ml-4 hover:text-red-600">
                      <Flag className="h-4 w-4 mr-1" />
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VendorReviews;
