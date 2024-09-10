package com.icbt.abcrestaurant.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.icbt.abcrestaurant.Model.Query;
import com.icbt.abcrestaurant.Service.QueryService;

@Controller
public class QueryController {

    @Autowired
    private QueryService queryService;

    @GetMapping("/query")
    public ResponseEntity<List<Query>> getAllQuery(){
        return new ResponseEntity<>(queryService.getAllQuery(),HttpStatus.OK);
    }

    @PostMapping("/query")
    public ResponseEntity<?> addQuery(@RequestBody Query query){
        try {
            Query savedQuery = queryService.addQuery(query);
            return new ResponseEntity<>(savedQuery, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/query/count")
public ResponseEntity<Long> getUserCount() {
    long count = queryService.count();
    return new ResponseEntity<>(count, HttpStatus.OK);
}

@PutMapping("/query/{queryId}")
public ResponseEntity<?> updateQuery(@PathVariable("queryId") String queryId, @RequestBody Query query) {
    try {
        Optional<Query> existingQueryOpt = queryService.getQueryById(queryId);
        if (!existingQueryOpt.isPresent()) {
            return new ResponseEntity<>("Query not found", HttpStatus.NOT_FOUND);
        }

        Query updatedQuery = queryService.updateQuery(queryId, query);
        return new ResponseEntity<>(updatedQuery, HttpStatus.OK);
    } catch (Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

@DeleteMapping("/query/{queryId}")
public ResponseEntity<?> deleteQuery(@PathVariable("queryId") String queryId) {
    try {
        Optional<Query> existingQueryOpt = queryService.getQueryById(queryId);
        if (!existingQueryOpt.isPresent()) {
            return new ResponseEntity<>("Query not found", HttpStatus.NOT_FOUND);
        }

        queryService.deleteQueryById(queryId);
        return new ResponseEntity<>("Query deleted successfully", HttpStatus.OK);
    } catch (Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

}
