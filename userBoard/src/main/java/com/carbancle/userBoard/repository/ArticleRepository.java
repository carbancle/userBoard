package com.carbancle.userBoard.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carbancle.userBoard.entity.Article;
import com.carbancle.userBoard.repository.querydsl.ArticleRepositoryCustom;

public interface ArticleRepository extends JpaRepository<Article, Long>, ArticleRepositoryCustom {

}
