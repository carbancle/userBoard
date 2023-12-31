package com.carbancle.userBoard.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String email;
	
	private String password;
	
	private String nickname;
	
	@Enumerated(EnumType.STRING)
	private Authority authority;
	
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	@Builder
	public Member(Long id, String email, String password, String nickname, Authority authority) {
		this.id = id;
		this.email = email;
		this.password = password;
		this.nickname = nickname;
		this.authority = authority;
	}
}
