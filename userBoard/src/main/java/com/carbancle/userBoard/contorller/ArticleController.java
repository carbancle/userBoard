package com.carbancle.userBoard.contorller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carbancle.userBoard.dto.ArticleResponseDto;
import com.carbancle.userBoard.dto.ChangeArticleResponseDto;
import com.carbancle.userBoard.dto.CreateArticleRequestDto;
import com.carbancle.userBoard.dto.MessageDto;
import com.carbancle.userBoard.dto.PageResponseDto;
import com.carbancle.userBoard.service.ArticleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/article")
@RequiredArgsConstructor
public class ArticleController {
	private final ArticleService articleService;
	
	@GetMapping("/page")
	public ResponseEntity<Page<PageResponseDto>> pageArticle(@RequestParam(name = "page") int page) {
		return ResponseEntity.ok(articleService.pageArticle(page));
	}
	
	@GetMapping("/one")
	public ResponseEntity<ArticleResponseDto> getOneArticle(@RequestParam(name = "id") Long id) {
		return ResponseEntity.ok(articleService.oneArticle(id));
	}
	
	@PostMapping("/")
	public ResponseEntity<ArticleResponseDto> createArticle(@RequestBody CreateArticleRequestDto request) {
		return ResponseEntity.ok(articleService.postArticle(request.getTitle(), request.getBody()));
	}
	
	@GetMapping("/change")
	public ResponseEntity<ArticleResponseDto> getChangeArticle(@RequestParam(name = "id") Long id) {
		return ResponseEntity.ok(articleService.oneArticle(id));
	}
	
	@PutMapping("/change")
	public ResponseEntity<ArticleResponseDto> putChangeArticle(@RequestBody ChangeArticleResponseDto request) {
		return ResponseEntity.ok(articleService.changeArticle(request.getId(), request.getTitle(), request.getBody()));
	}
	
	@DeleteMapping("/one")
	public ResponseEntity<MessageDto> deleteArticle(@RequestParam(name = "id") Long id) {
		articleService.deleteArticle(id);
		return ResponseEntity.ok(new MessageDto("Success"));
	}
}
