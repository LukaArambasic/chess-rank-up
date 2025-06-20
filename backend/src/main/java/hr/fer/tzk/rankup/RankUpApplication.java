package hr.fer.tzk.rankup;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class RankUpApplication {
//	@Autowired
//	private EmailSenderService emailSenderService;

	public static void main(String[] args) {
		SpringApplication.run(RankUpApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("https://chess-rank-up.vercel.app");
			}
		};
	}

/*
	Testing for mail sending
 */
//	@EventListener(ApplicationReadyEvent.class)
//	public void triggerMail() throws MessagingException, IOException {
//		emailSenderService.sendEmail(
//				"<email@example.com>",
//				"<subject>",
//				"<html-body>",
//				"<logo-path>",
//				"<attachment-path>");
//	}
}
