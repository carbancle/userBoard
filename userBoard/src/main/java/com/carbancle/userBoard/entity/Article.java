package com.carbancle.userBoard.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;

@Entity
@Getter
public class Article {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "article_id")
	private Long id;
	
	@Column(nullable = false)
	private String title;
	
	@Column(nullable = false, columnDefinition = "TEXT")
	private String body;
	
	@CreationTimestamp
	@Column
	private LocalDateTime createdAt = LocalDateTime.now(); 
	
	@UpdateTimestamp
	@Column
	private LocalDateTime updatedAt = LocalDateTime.now();
	
	@OneToMany(mappedBy = "article")
	private List<Comment> comments = new ArrayList<>();
	
	@OneToMany(mappedBy = "article")
	private List<Recommend> recommends = new ArrayList<>();
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;
	
	public static Article createArticle(String title, String body, Member member) {
		Article article = new Article();
		article.title = title;
		article.body = body;
		article.member = member;
		
		return article;
	}
	
	public static Article changeArticle(Article article, String title, String body) {
		article.title = title;
		article.body = body;
		
		return article;
	}
}
