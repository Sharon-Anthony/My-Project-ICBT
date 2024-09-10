package com.icbt.abcrestaurant.Repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.icbt.abcrestaurant.Model.User;

@Repository
public interface UserRepository extends MongoRepository<User,ObjectId> {

    Optional<User> findByUserId(String userId);

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    void deleteByUserId(String userId);


}
