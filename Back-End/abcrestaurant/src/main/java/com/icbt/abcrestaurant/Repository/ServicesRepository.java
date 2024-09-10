package com.icbt.abcrestaurant.Repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.icbt.abcrestaurant.Model.Services;

@Repository
public interface ServicesRepository extends MongoRepository<Services,ObjectId> {

    Optional<Services> findByServiceId(int serviceId);

    void deleteByServiceId(int serviceId);

  

}
