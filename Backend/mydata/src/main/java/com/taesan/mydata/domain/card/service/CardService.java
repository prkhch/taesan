package com.taesan.mydata.domain.card.service;

import com.taesan.mydata.domain.card.api.dto.response.PayResponse;
import com.taesan.mydata.domain.card.entity.Card;
import com.taesan.mydata.domain.card.entity.CardHistory;
import com.taesan.mydata.domain.card.repository.CardHistoryRepository;
import com.taesan.mydata.domain.card.repository.CardRepository;
import com.taesan.mydata.global.enumerate.Shop;
import com.taesan.mydata.global.util.DummyUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CardService {

    private final CardRepository cardRepository;
    private final CardHistoryRepository cardHistoryRepository;
    private final DummyUtils dummyUtils;

    public PayResponse pay(Long cardId, String shopName, Long amount) {
        Card card = cardRepository.findById(cardId).get();
        CardHistory cardHistory = CardHistory.builder()
                .card(card)
                .approvedNum("12345678")
                .approvedDtime(new Date())
                .status("01")
                .payType(dummyUtils.getType(2))
                .merchantName(shopName)
                .merchantRegno(dummyUtils.getShop().getRegistrationNumber())
                .approvedAmt(amount)
                .build();
        cardHistoryRepository.save(cardHistory);

        return PayResponse.builder()
                .rspCode("200")
                .rspMsg("성공")
                .approvedDtime(cardHistory.getApprovedDtime())
                .approvedNum(cardHistory.getApprovedNum())
                .build();
    }

}
