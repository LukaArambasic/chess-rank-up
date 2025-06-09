package hr.fer.tzk.rankup.security;

import org.springframework.beans.factory.annotation.Autowired;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

public class Sha512Hasher extends PasswordHasher {

    private final SecureRandom random = new SecureRandom();

    @Override
    public String hashPassword(String password, String salt) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.update(salt.getBytes());
            byte[] hashedPassword = md.digest(password.getBytes());
            return addPrefix(Base64.getEncoder().encodeToString(hashedPassword));
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean checkPassword(String password, String salt, String hash) {
        String newHash = hashPassword(password, salt);
        return newHash.equals(hash);
    }

    @Override
    public String getPrefix() {
        return "{sha512}";
    }

    @Override
    public String generateSalt() {
        byte[] salt = new byte[SALT_SIZE];
        random.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }

    public static void main(String[] args) {
        String password = "password";
        PasswordHasher hasher = new Sha512Hasher();
        String salt = hasher.generateSalt();

        //System.out.println("Original password: " + password);
        //System.out.println("Salt: " + salt);
        //System.out.println("Salt size: " + salt.length());

        String hashedPassword = hasher.hashPassword(password, salt);
        //System.out.println("Hashed password: " + hashedPassword);
    }
}
