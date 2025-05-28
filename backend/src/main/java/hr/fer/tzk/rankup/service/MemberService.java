package hr.fer.tzk.rankup.service;

import hr.fer.tzk.rankup.dto.BasicMemberDto;
import hr.fer.tzk.rankup.model.Member;
import hr.fer.tzk.rankup.model.Participation;
import hr.fer.tzk.rankup.model.SectionMember;
import hr.fer.tzk.rankup.repository.MemberRepository;
import hr.fer.tzk.rankup.repository.SectionMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public List<Member> findAllMembers() {
        return memberRepository.findAll();
    }

    public Optional<Member> findMemberById(Long id) {
        return memberRepository.findById(id);
    }

    public Optional<Member> findMemberByJmbag(String jmbag) {
        return memberRepository.findByJmbag(jmbag);
    }

    public Optional<Member> findMemberByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    public Member createMember(Member member) {
        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        return memberRepository.save(member);
    }

    public void deleteMemberById(Long id) {
        memberRepository.deleteById(id);
    }

    public void deleteMemberByJmbag(String jmbag) {
        memberRepository.deleteByJmbag(jmbag);
    }

    public void deleteMemberByEmail(String email) {
        memberRepository.deleteByEmail(email);
    }

    public boolean isJmbagInUse(String jmbag) {
        return memberRepository.findByJmbag(jmbag).isPresent();
    }

    public Member updateMemberFromBasic(Long idMember, BasicMemberDto member) {
        Optional<Member> memberOpt = findMemberById(idMember);
        if (memberOpt.isEmpty()) {
            return null;
        }

        Member existingMember = memberOpt.get();
        existingMember.setFirstName(member.getFirstName());
        existingMember.setLastName(member.getLastName());
        existingMember.setJmbag(member.getJmbag());

        return updateMember(existingMember);
    }


}
