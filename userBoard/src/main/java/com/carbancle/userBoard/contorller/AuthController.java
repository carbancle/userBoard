package com.carbancle.userBoard.contorller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carbancle.userBoard.dto.MemberRequestDto;
import com.carbancle.userBoard.dto.MemberResponseDto;
import com.carbancle.userBoard.dto.TokenDto;
import com.carbancle.userBoard.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
	private final AuthService authService;
	
	@PostMapping("/sign_up")
	public ResponseEntity<MemberResponseDto> signUp(@RequestBody MemberRequestDto requestDto) {
		return ResponseEntity.ok(authService.signUp(requestDto));
	}
	
	@PostMapping("/login")
	public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto requestDto) {
		return ResponseEntity.ok(authService.login(requestDto));
	}
}
