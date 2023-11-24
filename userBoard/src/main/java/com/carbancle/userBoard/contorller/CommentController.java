package com.carbancle.userBoard.contorller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carbancle.userBoard.dto.CommentRequestDto;
import com.carbancle.userBoard.dto.CommentResponseDto;
import com.carbancle.userBoard.dto.MessageDto;
import com.carbancle.userBoard.service.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {
	private final CommentService commentService;
	
	@GetMapping("/list")
	public ResponseEntity<List<CommentResponseDto>> getComments(@RequestParam(name = "id") Long id) {
		return ResponseEntity.ok(commentService.getComment(id));
	}
	
	@PostMapping("/")
	public ResponseEntity<CommentResponseDto> postComment(@RequestBody CommentRequestDto request) {
		return ResponseEntity.ok(commentService.createComment(request.getArticleId(), request.getBody()));
	}
	
	@DeleteMapping("/one")
	public ResponseEntity<MessageDto> deleteComment(@RequestParam(name = "id") Long id) {
		commentService.removeComment(id);
		return ResponseEntity.ok(new MessageDto("Success"));
	}
}
