package hr.fer.tzk.rankup.service;

import jakarta.activation.DataHandler;
import jakarta.activation.DataSource;
import jakarta.activation.FileDataSource;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class EmailSenderService {

    /*
    // TODO: Set correct information about SMTP account into application.yml
    // Use .env files for security
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(String to, String subject, String body, String logoPath, String attachmentPath) throws MessagingException, IOException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        MimeMultipart multipart = new MimeMultipart();
        MimeBodyPart messageBodyPart = new MimeBodyPart();

        helper.setTo(to);
        helper.setSubject(subject);

        messageBodyPart.setContent(body, "text/html; charset=UTF-8");
        multipart.addBodyPart(messageBodyPart);

        if (!logoPath.isBlank()) {
            messageBodyPart = new MimeBodyPart();
            DataSource fds = new FileDataSource(logoPath);
            messageBodyPart.setDataHandler(new DataHandler(fds));
            messageBodyPart.setHeader("Content-ID", "<logoimage>");

            multipart.addBodyPart(messageBodyPart);
        }

        if (!attachmentPath.isBlank()) {
            messageBodyPart = new MimeBodyPart();
            messageBodyPart.attachFile(new File(attachmentPath));

            multipart.addBodyPart(messageBodyPart);
        }

        message.setContent(multipart);

        javaMailSender.send(message);
    }
     */
}
