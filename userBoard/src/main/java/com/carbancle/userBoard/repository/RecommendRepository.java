package com.carbancle.userBoard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carbancle.userBoard.entity.Article;
import com.carbancle.userBoard.entity.Recommend;

public interface RecommendRepository extends JpaRepository<Recommend, Long> {
	List<Recommend> findAllByArticle(Article article);
}
