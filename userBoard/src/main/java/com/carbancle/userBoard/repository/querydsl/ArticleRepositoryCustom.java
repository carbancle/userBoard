package com.carbancle.userBoard.repository.querydsl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.carbancle.userBoard.dto.PageResponseDto;

public interface ArticleRepositoryCustom {
	Page<PageResponseDto> searchAll(Pageable pageable);
}
