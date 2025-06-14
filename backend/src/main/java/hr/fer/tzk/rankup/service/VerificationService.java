package hr.fer.tzk.rankup.service;

import hr.fer.tzk.rankup.dto.UserDto;
import hr.fer.tzk.rankup.model.Member;
import hr.fer.tzk.rankup.model.Verification;
import hr.fer.tzk.rankup.repository.VerificationRepository;
import jakarta.mail.MessagingException;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class VerificationService {
    private final int VERIFICATION_CODE_LENGTH = 64;
    private final VerificationRepository verificationRepository;
    //private final EmailSenderService emailSenderService;

    public VerificationService(VerificationRepository verificationRepository) {
        this.verificationRepository = verificationRepository;
        //this.emailSenderService = emailSenderService;
    }

    public void sendForVerification(Member member) {
        String url = RandomStringUtils.randomAlphanumeric(VERIFICATION_CODE_LENGTH);
        LocalDateTime expDateTime = LocalDateTime.now().plusDays(7L);
        Verification verification = new Verification();
        verification.setUrl(url);
        verification.setExpirationTime(expDateTime);
        verification.setMember(member);

        verificationRepository.save(verification);
        //sendVerificationEmail(member, verification);
    }

    /*private void sendVerificationEmail(Member member, Verification verification) {
        // TODO: napraviti bolji template; spremiti template negdje
        String content = "Pozdrav,<br>"
                + "Kliknite na donji link kako bi potvrdili svoju registraciju:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">POTVRDI</a></h3>"
                + "Hvala,<br>"
                + "Šahovska sekcija <br>"
                + "<img src=\"cid:logoimage\" alt=\"logo.png\" width=\"200\">";
        String URL = "http://localhost:8080/auth/verify?verificationCode=" + verification.getUrl();
        content = content.replace("[[URL]]", URL);

        try {
            // FIXME: HARDKODIRANE VRIJEDNOSTI!!!!
            emailSenderService.sendEmail("<email>", "Potvrda verifikacije", content, "logo.jpeg", "");
        } catch (MessagingException | IOException e) {
            throw new RuntimeException(e);
        }
    }*/

    public ResponseEntity<String> verify(String URL) {
        Optional<Verification> verification = verificationRepository.findVerificationByUrl(URL);

        if (verification.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Pogrešan link za verifikaciju");
        } else {
            Verification newVerification = verification.get();
            if (LocalDateTime.now().isBefore(newVerification.getExpirationTime())) {
                newVerification.setUrl("");
                verificationRepository.save(newVerification);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Uspješna verifikacija!");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Link za verifikaciju je istekao!");
            }
        }
    }
}
