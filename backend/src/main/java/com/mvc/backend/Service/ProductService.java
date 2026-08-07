package com.mvc.backend.Service;


import com.mvc.backend.Model.Product;
import com.mvc.backend.Repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {


    @Autowired
    private ProductRepo productRepo;

    public List<Product> getAllProducts(){

        return productRepo.findAll();

    }
}
