package com.carbancle.userBoard.service;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carbancle.userBoard.dto.MemberRequestDto;
import com.carbancle.userBoard.dto.MemberResponseDto;
import com.carbancle.userBoard.dto.TokenDto;
import com.carbancle.userBoard.entity.Member;
import com.carbancle.userBoard.jwt.TokenProvider;
import com.carbancle.userBoard.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {
	private final AuthenticationManagerBuilder managerBuilder;
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	private final TokenProvider tokenProvider;
	
	public MemberResponseDto signUp(MemberRequestDto requestDto) {
		if (memberRepository.existsByEmail(requestDto.getEmail())) {
			throw new RuntimeException("이미 가입되어 있는 유저입니다.");
		}
		
		Member member = requestDto.toMember(passwordEncoder);
		return MemberResponseDto.of(memberRepository.save(member));
	}
	
	public TokenDto login(MemberRequestDto requestDto) {
		UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
		
		Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
		
		return tokenProvider.generateTokenDto(authentication);
	}

}
