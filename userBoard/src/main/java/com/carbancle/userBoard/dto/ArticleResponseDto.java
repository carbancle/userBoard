package com.carbancle.userBoard.dto;

import java.time.format.DateTimeFormatter;

import com.carbancle.userBoard.entity.Article;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ArticleResponseDto {
	private Long articleId;
	private String memberNickname;
	private String articleTitle;
	private String articleBody;
	private String createdAt;
	private String updatedAt;
	private boolean isWritten;
	
	public static ArticleResponseDto of(Article article, boolean bool) {
		return ArticleResponseDto.builder()
				.articleId(article.getId())
				.memberNickname(article.getMember().getNickname())
				.articleTitle(article.getTitle())
				.articleBody(article.getBody())
				.createdAt(article.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
				.updatedAt(article.getUpdatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
				.isWritten(bool)
				.build();
	}
}
