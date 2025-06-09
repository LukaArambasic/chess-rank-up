package hr.fer.tzk.rankup.utils;

public class JmbagUtils {

    /**
     * Checks if JMBAG is valid.
     *
     * <p>
     * For more details about how the algorithm actually works, read the source code.
     * </p>
     *
     * @param jmbag JMBAG that will be validated.
     * @return {@code true} if JMBAG is valid, {@code false} otherwise
     */
    public static boolean validateJmbag(String jmbag) {
        // Regex checks if all characters are digits
        if (jmbag.length() != 10 || !jmbag.matches("\\d+")) {
            return false;
        }

        final int[] jmbagWeights = {2, 3, 4, 5, 1, 2, 3, 4, 5};
        int totalSum = 0;
        final int controlDigit = Character.getNumericValue(jmbag.charAt(9));
        final String firstNineDigits = jmbag.substring(0, 9);

        for (int i = 0; i < 9; i++) {
            totalSum += Character.getNumericValue(firstNineDigits.charAt(i)) * jmbagWeights[i];
        }

        int controlDigitCalculated = 11 - (totalSum % 11);
        if (controlDigitCalculated == 10 || controlDigitCalculated == 11) {
            controlDigitCalculated = 0;
        }
        return controlDigitCalculated == controlDigit;
    }
}
