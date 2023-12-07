package com.carbancle.userBoard.dto;

import java.time.format.DateTimeFormatter;

import com.carbancle.userBoard.entity.Article;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PageResponseDto {
	private Long articleId;
	private String articleTitle;
	private String memberNickname;
	private String createdAt;
	private String updatedAt;
	
	public static PageResponseDto of(Article article) {
		return PageResponseDto.builder()
				.articleId(article.getId())
				.articleTitle(article.getTitle())
				.memberNickname(article.getMember().getNickname())
				.createdAt(article.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
				.updatedAt(article.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
				.build();
	}
}
