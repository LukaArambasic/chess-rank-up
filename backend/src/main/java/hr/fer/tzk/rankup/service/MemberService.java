package hr.fer.tzk.rankup.service;

import hr.fer.tzk.rankup.dto.BasicMemberDto;
import hr.fer.tzk.rankup.model.Member;
import hr.fer.tzk.rankup.model.Participation;
import hr.fer.tzk.rankup.model.SectionMember;
import hr.fer.tzk.rankup.repository.MemberRepository;
import hr.fer.tzk.rankup.repository.SectionMemberRepository;
import hr.fer.tzk.rankup.utils.JmbagUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    public List<Member> createMembersFromFile(MultipartFile file) throws IOException {
        List<Member> members = readMembersFromFile(file);
        //members.forEach(member -> System.out.println(member.getFirstName() + ' ' + member.getLastName() + ' ' + member.getJmbag() + ' ' + member.getEmail()));
        members.forEach(memberRepository::save);
        return members;
    }

    private List<Member> readMembersFromFile(MultipartFile file) throws IOException {
        String type = file.getContentType();
        //System.out.println(type);
        //System.out.println(file.getOriginalFilename());
        assert type != null;

        List<Member> members;
        //System.out.println("csv");
        byte[] textBytes = file.getBytes();
        String textString = new String(textBytes);
        List<String> tmp = List.of(textString.split("\n"));

        //System.out.println(textString);

        //System.out.println();
        //System.out.println();
        members = tmp.stream()
                .map(line -> {
                    List<String> chunks = List.of(line.split(","));
                    String firstName = chunks.get(0);
                    String lastName = chunks.get(1);
                    String jmbag = chunks.get(2);
                    String email = chunks.get(3);

                    // JMBAG
                    if (jmbag.startsWith("36") || jmbag.startsWith("69") || jmbag.startsWith("62")) {
                        jmbag = "00"+jmbag;
                    } else if (jmbag.startsWith("246")) {
                        jmbag = "0" + jmbag;
                    }
                    Member member = new Member();
                    member.setFirstName(firstName);
                    member.setLastName(lastName);
                    member.setJmbag(jmbag);
                    member.setEmail(email);
                    member.setVerified(true);


                    return member;
                }).toList();

        assert members != null;
        //System.out.println(members.size());
        return members;
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
