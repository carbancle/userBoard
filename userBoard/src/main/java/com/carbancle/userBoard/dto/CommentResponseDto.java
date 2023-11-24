package com.carbancle.userBoard.dto;

import java.time.format.DateTimeFormatter;

import com.carbancle.userBoard.entity.Comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponseDto {
	private Long commentId;
	private String memberNickname;
	private String commentBody;
	private String createdAt;
	private boolean isWritten;
	
	public static CommentResponseDto of(Comment comment, boolean bool) {
		return CommentResponseDto.builder()
				.commentId(comment.getId())
				.memberNickname(comment.getMember().getNickname())
				.commentBody(comment.getText())
				.createdAt(comment.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
				.isWritten(bool)
				.build();
	}
}
