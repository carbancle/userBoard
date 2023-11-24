package com.carbancle.userBoard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecommendDto {
	private int recommendNum;
	private boolean isRecommended;
	
	public static RecommendDto noOne() {
		return RecommendDto.builder()
				.recommendNum(0)
				.isRecommended(false)
				.build();
	}
}
