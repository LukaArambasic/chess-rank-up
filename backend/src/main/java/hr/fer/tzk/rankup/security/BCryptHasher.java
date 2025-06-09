package hr.fer.tzk.rankup.security;

import org.mindrot.jbcrypt.BCrypt;
import java.security.SecureRandom;
import java.util.Base64;

// TODO: Add tests for this
public class BCryptHasher extends PasswordHasher {

    private final SecureRandom random = new SecureRandom();

    @Override
    public String hashPassword(String password, String salt) {
        String combinedPassword = password + salt;
        String bcryptSalt = BCrypt.gensalt();
        return addPrefix(BCrypt.hashpw(combinedPassword, bcryptSalt));
    }

    @Override
    public boolean checkPassword(String password, String salt, String hash) {
        String combinedPassword = password + salt;
        final String noPrefixHash = hash.substring(getPrefix().length());
        return BCrypt.checkpw(combinedPassword, noPrefixHash);
    }

    @Override
    public String getPrefix() {
        return "{bcrypt}";
    }

    @Override
    public String generateSalt() {
        byte[] salt = new byte[SALT_SIZE];
        random.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }

    public static void main(String[] args) {
        String password = "password";
        PasswordHasher hasher = new BCryptHasher();
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

        String p = "password1";
        String s = "fvF+6y2btWnIKbWSMEywI5xbFiVlg42R";
        String hp = "{bcrypt}$2a$10$aqevOEhrvv9PmrWVmP5yHeCRfPsHw/W.eCDRkmecUJOMPlYbwntTu";
        if (hasher.checkPassword(p, s, hp)) {
            //System.out.println("Correct password");
        } else {
            //System.out.println("Incorrect password");
        }
    }
}
