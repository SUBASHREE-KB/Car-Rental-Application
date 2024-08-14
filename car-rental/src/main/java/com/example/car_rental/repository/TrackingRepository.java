package com.example.car_rental.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.car_rental.dto.AgencyBookingCountDto;
import com.example.car_rental.dto.AgencyMetricsDto;
import com.example.car_rental.dto.BookingStatusCountDTO;
import com.example.car_rental.dto.CustomerPerMonthDto;
import com.example.car_rental.dto.TrackingDetailsDTO;
import com.example.car_rental.model.Tracking;

import jakarta.transaction.Transactional;

@Repository
public interface TrackingRepository extends JpaRepository<Tracking, Integer> {

    List<Tracking> findByStatus(String string);

    @Query("select new com.example.car_rental.dto.TrackingDetailsDTO(u.username,u.phoneNumber,u.email,v.imageLink,v.type,v.model,t.trackId,t.due,t.status,t.fine) from Tracking t join Booking b on t.bookId = b.bookId join User u on b.userId = u.userId join Vehicle v on b.vehicleId = v.vehicleId where v.userId = :userId and t.status not in ('cancelled', 'refunded') order by case when t.status = 'Overdue' then 1 when t.status = 'Ongoing' then 2 when t.status = 'Booked' then 3 else 4 end,t.due asc")
    List<TrackingDetailsDTO> getAllTrackingByUserId(@Param("userId") int userId);

    Tracking findByTrackId(int trackId);

    @Query("select count(*) from Tracking t join Booking b  on t.bookId = b.bookId join Vehicle v on v.vehicleId = b.vehicleId where v.userId = :id ")
    Long countoftrackingByAgency(int id);

    List<Tracking> findByUserIdAndStatusOrderByModifiedAtDesc(int userId, String status);

    List<Tracking> findByUserIdAndStatus(int userId, String string);

    Tracking findByBookId(int bookId);

    @Query("select new com.example.car_rental.dto.TrackingDetailsDTO(u.username,u.phoneNumber,u.email,v.imageLink,v.type,v.model,t.trackId,t.due,t.status,t.fine) from Tracking t join Booking b on t.bookId = b.bookId join User u on b.userId = u.userId join Vehicle v on b.vehicleId = v.vehicleId where v.userId = :userId and t.status in ('Cancelled','Refunded') order by case when t.status = 'cancelled' then 1 else 2 end,t.due asc")
    List<TrackingDetailsDTO> getAllCancelledTrackingByUserId(int userId);

    @Query("SELECT new com.example.car_rental.dto.BookingStatusCountDTO(SUM(CASE WHEN t.status in ('Ongoing','Booked','Overdue','Completed') THEN 1 ELSE 0 END), SUM(CASE WHEN t.status in ('Cancelled','Refunded') THEN 1 ELSE 0 END)) FROM Tracking t")
    BookingStatusCountDTO getBookingStatusCounts();

    @Query("Select new com.example.car_rental.dto.AgencyBookingCountDto(u.username, count(t.trackId)) from User u join Vehicle v on u.userId = v.userId join Booking b on b.vehicleId = v.vehicleId join Tracking t on t.bookId = b.bookId  group by u.username")
    List<AgencyBookingCountDto> getBookingCountsByAgency();

    @Query("SELECT new com.example.car_rental.dto.AgencyMetricsDto(" +
            "u.username, COUNT(t), AVG(r.rating), COUNT(v.vehicleId), " +
            "AVG(b.price)) " +
            "FROM User u " +
            "JOIN Vehicle v ON u.userId = v.userId " +
            "JOIN Booking b ON v.vehicleId = b.vehicleId " +
            "JOIN Tracking t on t.bookId = b.bookId " +
            "LEFT JOIN Review r ON b.bookId = r.bookId " +
            "WHERE u.username IN :agencyNames and t.status in ('Ongoing','Overdue','Completed','Booked')" +
            "GROUP BY u.username")
    List<AgencyMetricsDto> findMetricsByAgencyNames(@Param("agencyNames") List<String> agencyNames);

    @Query("SELECT new com.example.car_rental.dto.BookingStatusCountDTO(SUM(CASE WHEN t.status in ('Ongoing','Booked','Overdue','Completed') THEN 1 ELSE 0 END), SUM(CASE WHEN t.status in ('Cancelled','Refunded') THEN 1 ELSE 0 END)) FROM Tracking t join Booking b on t.bookId = b.bookId join Vehicle v on b.vehicleId = v.vehicleId where v.userId = :userId")
    BookingStatusCountDTO getBookingStatusCountsAgency(int userId);

    @Query("SELECT AVG(b.price+t.fine) FROM Tracking t join Booking b on t.bookId = b.bookId join Vehicle v on b.vehicleId = v.vehicleId where v.userId = :userId and t.status in ('Ongoing','Booked','Overdue','Completed')")
    Double findRevenueById(int userId);

    @Query("SELECT AVG(b.price*0.5) FROM Tracking t join Booking b on t.bookId = b.bookId join Vehicle v on b.vehicleId = v.vehicleId where v.userId = :userId and t.status in ('Cancelled','Refunded')")
    Double findLossById(int userId);

    @Query("SELECT new com.example.car_rental.dto.CustomerPerMonthDto(MONTH(b.createdAt), " +
            "SUM(CASE WHEN t.status in ('Ongoing','Overdue','Booked','Completed') THEN 1 ELSE 0 END), " +
            "SUM(CASE WHEN t.status in ('Refunded','Cancelled') THEN 1 ELSE 0 END)) " +
            "FROM Tracking t join Booking b on t.bookId = b.bookId " +
            "GROUP BY MONTH(b.createdAt) " +
            "ORDER BY MONTH(b.createdAt)")
    List<CustomerPerMonthDto> findBookingCountPerMonth(int userId);
    
    @Modifying
    @Transactional
    @Query("UPDATE Tracking t SET t.status = 'Ongoing' WHERE t.bookId = :id and t.status not in ('Completed','Overdue')")
    void updateStatusForBookId(int id);

   

}
