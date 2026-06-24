package com.bookmanager.backend.service;

import com.bookmanager.backend.dto.request.LoginRequest;
import com.bookmanager.backend.dto.request.UserRequest;
import com.bookmanager.backend.dto.response.AuthResponse;

public interface UserService {

    AuthResponse register(UserRequest request);
    AuthResponse login(LoginRequest request);

}
