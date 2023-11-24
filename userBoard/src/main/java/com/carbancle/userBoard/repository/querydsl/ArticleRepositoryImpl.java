package com.carbancle.userBoard.repository.querydsl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.carbancle.userBoard.dto.PageResponseDto;
import com.carbancle.userBoard.entity.Article;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

import static com.carbancle.userBoard.entity.QArticle.article;

@RequiredArgsConstructor
public class ArticleRepositoryImpl implements ArticleRepositoryCustom {
	private final JPAQueryFactory queryFactory;
	
	@Override
	public Page<PageResponseDto> searchAll(Pageable pageable) {
		
		List<Article> content = queryFactory
				.selectFrom(article)
				.orderBy(article.id.desc())
				.offset(pageable.getOffset())
				.limit(pageable.getPageSize())
				.fetch();
		
		List<PageResponseDto> pages = content
				.stream()
				.map(PageResponseDto::of)
				.collect(Collectors.toList());
		
		int totalSize = queryFactory
				.selectFrom(article)
				.fetch()
				.size();
		
		return new PageImpl<>(pages, pageable, totalSize);
	}
}
