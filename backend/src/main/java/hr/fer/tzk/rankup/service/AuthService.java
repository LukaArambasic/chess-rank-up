package hr.fer.tzk.rankup.service;

import hr.fer.tzk.rankup.dto.BasicMemberDto;
import hr.fer.tzk.rankup.dto.UserDto;
import hr.fer.tzk.rankup.form.LoginForm;
import hr.fer.tzk.rankup.form.RegisterForm;
import hr.fer.tzk.rankup.mapper.MemberMapper;
import hr.fer.tzk.rankup.model.Member;
import hr.fer.tzk.rankup.model.SectionMember;
import hr.fer.tzk.rankup.security.JwtUtil;
import hr.fer.tzk.rankup.security.PasswordHasher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.AbstractMap;
import java.util.Optional;

@Service
public class AuthService {

    private final JwtUtil jwtUtil;
    private final PasswordHasher passwordHasher;
    private final MemberService memberService;
    private final VerificationService verificationService;
    private final SectionMemberService sectionMemberService;

    @Autowired
    public AuthService(JwtUtil jwtUtil, @Qualifier("argon2idHasher") PasswordHasher passwordHasher, MemberService memberService, VerificationService verificationService, SectionMemberService sectionMemberService) {
        this.jwtUtil = jwtUtil;
        this.passwordHasher = passwordHasher;
        this.memberService = memberService;
        this.verificationService = verificationService;
        this.sectionMemberService = sectionMemberService;
    }

    private String checkForConflictRegister(RegisterForm form) {
        Optional<Member> memberByEmailOpt = memberService.findMemberByEmail(form.getEmail());
        if (memberByEmailOpt.isPresent()) {
            return "Email already in use";
        }
        Optional<Member> memberByJmbagOpt = memberService.findMemberByJmbag(form.getJmbag());
        if (memberByJmbagOpt.isPresent()) {
            return "JMBAG already in use";
        }
        return null;
    }

    public AbstractMap.SimpleEntry<HttpStatus, UserDto> login(LoginForm login) {
        Optional<Member> memberOpt = memberService.findMemberByEmail(login.getEmail());
        if (memberOpt.isEmpty()) {
            return new AbstractMap.SimpleEntry<>(HttpStatus.BAD_REQUEST, new UserDto(null, null, "Invalid email or password", null, false));
        }

        Member member = memberOpt.get();
        String storedHash = member.getPasswordHash();
        String salt = member.getSalt();

        if (!passwordHasher.checkPassword(login.getPassword(), salt, storedHash)) {
            return new AbstractMap.SimpleEntry<>(HttpStatus.BAD_REQUEST, new UserDto(null, null, "Invalid email or password", null, false));
        }

        if (!member.isVerified()) {
            return new AbstractMap.SimpleEntry<>(HttpStatus.BAD_REQUEST, new UserDto(null, null, "Invalid email or password", null, false));
        }

        String token = jwtUtil.generateToken(member.getEmail());
        BasicMemberDto memberDto = MemberMapper.toBasicDto(member);
        UserDto userDto = new UserDto(memberDto, token, null, member.getId(), isSuperAdmin(member.getId()));
        return new AbstractMap.SimpleEntry<>(HttpStatus.OK, userDto);
    }

    public AbstractMap.SimpleEntry<HttpStatus, String> register(RegisterForm form) {
        String checkForConflictRes = checkForConflictRegister(form);
        if (checkForConflictRes != null) {
            return new AbstractMap.SimpleEntry<>(HttpStatus.CONFLICT, checkForConflictRes);
        }

        String salt = passwordHasher.generateSalt();
        String passwordHash = passwordHasher.hashPassword(form.getPassword(), salt);

        Member newMember;
        try {
            newMember = new Member();
            newMember.setFirstName(form.getFirstName());
            newMember.setLastName(form.getLastName());
            newMember.setJmbag(form.getJmbag());
            newMember.setEmail(form.getEmail());
            newMember.setPasswordHash(passwordHash);
            newMember.setSalt(salt);

            newMember = memberService.createMember(newMember);
            verificationService.sendForVerification(newMember);
        } catch (IllegalArgumentException exception) {
            return new AbstractMap.SimpleEntry<>(HttpStatus.BAD_REQUEST, exception.getMessage());
        }

        return new AbstractMap.SimpleEntry<>(HttpStatus.OK, null);
    }

    public UserDto me(String token) {
        // 1) validacija i izdvajanje emaila iz tokena
        String email = jwtUtil.validateAndExtractEmail(token);
        if (email == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Nevažeći ili istekao token");
        }

        // 2) dohvat korisnika po emailu
        Member member = memberService.findMemberByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Korisnik ne postoji"));

        // 3) mapiranje u DTO
        BasicMemberDto basic = MemberMapper.toBasicDto(member);

        // 4) vraćanje složenog UserDto
        return new UserDto(
                basic,            // user
                token,            // token
                null,             // error
                member.getId(),    // id
                isSuperAdmin(member.getId())
        );
    }

    private boolean isSuperAdmin(Long memberId) {
        long sectionId = 1;
        SectionMember sectionMember = sectionMemberService.findSectionMemberByIdSection(memberId, sectionId).orElse(null);

        return sectionMember!=null && sectionMember.getRank().getName().equals("Superadmin");
    }

}
