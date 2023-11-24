package com.carbancle.userBoard.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carbancle.userBoard.config.SecurityUtil;
import com.carbancle.userBoard.dto.RecommendDto;
import com.carbancle.userBoard.entity.Article;
import com.carbancle.userBoard.entity.Member;
import com.carbancle.userBoard.entity.Recommend;
import com.carbancle.userBoard.repository.ArticleRepository;
import com.carbancle.userBoard.repository.MemberRepository;
import com.carbancle.userBoard.repository.RecommendRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class RecommendService {
	private final ArticleRepository articleRepository;
	private final MemberRepository memberRepository;
	private final RecommendRepository recommendRepository;
	
	@Transactional(readOnly = true)
	public RecommendDto allRecommend(Long id) {
		Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다."));
		List<Recommend> recommends = recommendRepository.findAllByArticle(article);
		int size = recommends.size();
		if (size == 0) {
			return RecommendDto.noOne();
		}
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
			return new RecommendDto(size, false);
		} else {
			Member member = memberRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
			boolean result = recommends.stream().anyMatch(recommend -> recommend.getMember().equals(member));
			
			return new RecommendDto(size, result);
		}
	}
	
	public void createRecommend(Long id) {
		Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
		Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다."));
		
		Recommend recommend = new Recommend(member, article);
		recommendRepository.save(recommend);
	}
	
	public void removeRecommend(Long id) {
		Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
		Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다."));
		
		Recommend recommend = recommendRepository.findAllByArticle(article)
				.stream()
				.filter(r -> r.getMember().equals(member))
				.findFirst()
				.orElseThrow(() -> new RuntimeException("추천이 없습니다."));
		
		recommendRepository.delete(recommend);
	}
}
