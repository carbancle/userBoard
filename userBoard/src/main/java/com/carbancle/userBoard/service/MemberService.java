package com.carbancle.userBoard.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carbancle.userBoard.config.SecurityUtil;
import com.carbancle.userBoard.dto.MemberResponseDto;
import com.carbancle.userBoard.entity.Member;
import com.carbancle.userBoard.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;

	@Transactional(readOnly = true)
	public MemberResponseDto getMyInfoBySercurity() {
		return memberRepository.findById(SecurityUtil.getCurrentMemberId())
				.map(MemberResponseDto::of)
				.orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
	}
	
	public MemberResponseDto changeMemberNickname(String email, String nickname) {
		Member member = memberRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
		
		member.setNickname(nickname);
		
		return MemberResponseDto.of(memberRepository.save(member));
	}
	
	public MemberResponseDto changeMemberPassword(String email, String exPassword, String newPassword) {
		Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
		
		if (!passwordEncoder.matches(exPassword, member.getPassword())) {
			throw new RuntimeException("비밀번호가 맞지 않습니다.");
		}
		
		member.setPassword(passwordEncoder.encode(newPassword));
		
		return MemberResponseDto.of(memberRepository.save(member));
	}
}