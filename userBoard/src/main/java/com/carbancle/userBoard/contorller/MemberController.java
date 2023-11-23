package com.carbancle.userBoard.contorller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carbancle.userBoard.dto.ChangePasswordRequestDto;
import com.carbancle.userBoard.dto.MemberRequestDto;
import com.carbancle.userBoard.dto.MemberResponseDto;
import com.carbancle.userBoard.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
	private final MemberService memberService;
	
	@GetMapping("/me")
	public ResponseEntity<MemberResponseDto> getMyMemberInfo() {
		MemberResponseDto myInfoBySecurity = memberService.getMyInfoBySercurity();
		
		System.out.println(myInfoBySecurity.getNickname());
		
		return ResponseEntity.ok(myInfoBySecurity);
	}
	
	@PostMapping("/nickname")
	public ResponseEntity<MemberResponseDto> setMemberNickname(@RequestBody MemberRequestDto request) {
		return ResponseEntity.ok(memberService.changeMemberNickname(request.getEmail(), request.getNickname()));
	}
	
	@PostMapping("/password")
	public ResponseEntity<MemberResponseDto> setMemberPassword(@RequestBody ChangePasswordRequestDto request) {
		return ResponseEntity.ok(memberService.changeMemberNickname(request.getExPassword(), request.getNewPassword()));
	}
}
