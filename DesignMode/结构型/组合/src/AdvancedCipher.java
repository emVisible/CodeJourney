public class AdvancedCipher extends CipherDecorator {

  AdvancedCipher(Cipher cipher) {
    super(cipher);
  }

  @Override
  public String encrypt(String plainText) {
    String res = super.encrypt(plainText);
    res = this.mod(res);
    return res;
  }

  public String mod(String text) {
    System.out.println("ADVANCED-MOD");
    String res = "";
    for (int i = 0; i < text.length(); i++) {
      res += String.valueOf(text.charAt(i) % 6);
    }
    return res;
  }

}