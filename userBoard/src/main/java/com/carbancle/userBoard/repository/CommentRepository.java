package com.carbancle.userBoard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carbancle.userBoard.entity.Article;
import com.carbancle.userBoard.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	List<Comment> findAllByArticle(Article article);
}
