package com.icbt.abcrestaurant.Repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.icbt.abcrestaurant.Model.Query;

@Repository
public interface QueryRepository extends MongoRepository<Query,ObjectId> {

    Optional<Query> findByQueryId(String queryId);

    void deleteByQueryId(String queryId);

}
