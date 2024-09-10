package com.icbt.abcrestaurant.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "query")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Query {
 @Id
  private ObjectId objectId;
  private String queryId;
  private String serviceName;
  private String email;
  private String query;
  private String response;
}
