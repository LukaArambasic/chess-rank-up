package hr.fer.tzk.rankup.security;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import java.security.SecureRandom;
import java.sql.SQLOutput;
import java.util.Base64;

public class Argon2idHasher extends PasswordHasher {

    private static final SecureRandom random = new SecureRandom();

    // Parameters for hashing
    private static final int MEMORY_COST = 65536; // 64 MB
    private static final int ITERATIONS = 2;
    private static final int PARALLEL_THREADS = 1;

    @Override
    public String hashPassword(String password, String salt) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String saltedPassword = password + salt;
        final String hash = argon2.hash(ITERATIONS, MEMORY_COST, PARALLEL_THREADS, saltedPassword.toCharArray());
        return addPrefix(hash);
    }

    @Override
    public boolean checkPassword(String password, String salt, String hash) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        final String saltedPassword = password + salt;
        final String noPrefixHash = hash.substring(getPrefix().length());
        return argon2.verify(noPrefixHash, saltedPassword.toCharArray());
    }

    @Override
    public String getPrefix() {
        return "{argon2id}";
    }

    @Override
    public String generateSalt() {
        byte[] salt = new byte[SALT_SIZE];
        random.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }

    public static void main(String[] args) {
        String password = "password";
        PasswordHasher hasher = new Argon2idHasher();
        String salt = hasher.generateSalt();

        //System.out.println("Original password: " + password);
        //System.out.println("Salt: " + salt);
        //System.out.println("Salt size: " + salt.length());

        String hashedPassword = hasher.hashPassword(password, salt);
        //System.out.println("Hashed password: " + hashedPassword);

        if (hasher.checkPassword(password, salt, hashedPassword)) {
            //System.out.println("Correct password");
        } else {
            //System.out.println("Incorrect password");
        }

        //System.out.println("===================");
        String[] passwords = {"password1", "password2", "password3"};
        for (int i = 0; i < 3; i++) {
            String p = passwords[i];
            String s = hasher.generateSalt();
            String hp = hasher.hashPassword(p, s);

            //System.out.println("Person " + (i + 1) + ": ");
            //System.out.println("Password: " + p);
            //System.out.println("Salt: " + s);
            //System.out.println("Salt size: " + s.length());
            //System.out.println("Hashed password: " + hp);
            //System.out.println("===================\n");
        }
    }
}
