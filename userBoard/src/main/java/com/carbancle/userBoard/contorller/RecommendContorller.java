package com.carbancle.userBoard.contorller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carbancle.userBoard.dto.MessageDto;
import com.carbancle.userBoard.dto.RecommendDto;
import com.carbancle.userBoard.dto.RecommendRequestDto;
import com.carbancle.userBoard.service.RecommendService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/recommend")
@RequiredArgsConstructor
public class RecommendContorller {
	private final RecommendService recommendService;
	
	@GetMapping("/list")
	public ResponseEntity<RecommendDto> getRecommends(@RequestParam(name = "id") Long id) {
		return ResponseEntity.ok(recommendService.allRecommend(id));
	}
	
	@PostMapping("/")
	public ResponseEntity<MessageDto> postRecommend(@RequestBody RecommendRequestDto request) {
		recommendService.createRecommend(request.getId());
		return ResponseEntity.ok(new MessageDto("Success"));
	}
	
	@DeleteMapping("/one")
	public ResponseEntity<MessageDto> deleteRecommend(@RequestParam(name = "id") Long id) {
		recommendService.removeRecommend(id);
		return ResponseEntity.ok(new MessageDto("Success"));
	}
}
