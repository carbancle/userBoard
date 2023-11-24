package com.carbancle.userBoard.dto;

import lombok.Getter;

@Getter
public class CommentRequestDto {
	private Long articleId;
	private String body;
}
