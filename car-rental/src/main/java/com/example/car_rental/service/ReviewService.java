package com.example.car_rental.service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.car_rental.dto.CustomerReviewDto;
import com.example.car_rental.dto.ReviewDetailsDTO;
import com.example.car_rental.model.Review;
import com.example.car_rental.repository.CustomerReviewRepository;
import com.example.car_rental.repository.ReviewRepository;

@Service
public class ReviewService {
    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    private CustomerReviewRepository customerReviewRepository;

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Review giveReview(int user_id, Review newReview) {
        Review review = new Review();
        review.setBookId(newReview.getBookId());
        review.setUserId(user_id);
        review.setVehicleId(newReview.getVehicleId());
        review.setRating(newReview.getRating());
        review.setDate(LocalDate.now());
        review.setComment(newReview.getComment());
        reviewRepository.save(review);
        return review;
    }

    public List<Review> getAllReviewsByUserId(int user_id) {
        List<Review> reviewList = reviewRepository.findByUserId(user_id);
        return reviewList;
    }

    public List<ReviewDetailsDTO> getAllReviewsByVehicleId() {
        List<ReviewDetailsDTO> reviewDetailsList = reviewRepository.findAllVehicleDetailsWithBasicReviews();

        for (ReviewDetailsDTO reviewDetails : reviewDetailsList) {
            List<CustomerReviewDto> customerReviews = customerReviewRepository
                    .findCustomerReviewsByVehicleId(reviewDetails.getVehicleId());
            customerReviews.sort(Comparator.comparing(CustomerReviewDto::getDate).reversed());
            reviewDetails.setCustomerReviews(customerReviews);
        }

        return reviewDetailsList;
    }

}
