public class SimpleCipher implements Cipher {

  @Override
  public String encrypt(String plainText) {
    String res = "";
    for (int i = 0; i < plainText.length(); i++) {
      char ch = plainText.charAt(i);
      if (ch > 'a' && ch < 'z') {
        ch += 6;
        if (ch > 'z')
          ch -= 26;
        if (ch < 'a')
          ch += 26;
      } else if (ch >= 'A' && ch <= 'Z') {
        ch += 6;
        if (ch > 'Z')
          ch -= 26;
        if (ch < 'A')
          ch += 26;
      }
      res += ch;
    }
    return res;
  }
}