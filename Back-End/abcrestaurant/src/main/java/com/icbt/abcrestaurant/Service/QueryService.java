package com.icbt.abcrestaurant.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.icbt.abcrestaurant.Model.Query;
import com.icbt.abcrestaurant.Repository.QueryRepository;

@Service
public class QueryService {

    @Autowired
    private QueryRepository queryRepository;

    public Query addQuery(Query query) {
        query.setQueryId(generateQueryId());
        return queryRepository.save(query);
    }

    public List<Query> getAllQuery() {
        return queryRepository.findAll();
    }

    public long count() {
        return queryRepository.count();
    }

    private String generateQueryId() {
        long count = queryRepository.count();
        return String.format("q%03d", count + 1);
    }

    public Optional<Query> getQueryById(String queryId) {
        return queryRepository.findByQueryId(queryId);
    }

    public Query updateQuery(String queryId, Query query) {
        Query existingQuery = queryRepository.findByQueryId(queryId)
                .orElseThrow(() -> new RuntimeException("Query not found with id: " + queryId));

        existingQuery.setServiceName(query.getServiceName());
        existingQuery.setQuery(query.getQuery());
        existingQuery.setEmail(query.getEmail());
        existingQuery.setResponse(query.getResponse());

        return queryRepository.save(existingQuery);
    }

    public void deleteQueryById(String queryId) {
        queryRepository.deleteByQueryId(queryId);
    }

}
