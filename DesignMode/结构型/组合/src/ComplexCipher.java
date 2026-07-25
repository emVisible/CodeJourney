public class ComplexCipher extends CipherDecorator {

  ComplexCipher(Cipher cipher) {
    super(cipher);
  }

  @Override
  public String encrypt(String plainText) {
    String res = super.encrypt(plainText);
    res = this.reverse(res);
    return res;
  }

  private String reverse(String text) {
    System.out.println("COMPLEX-REVERSE");
    String res = "";
    for (int i = text.length(); i > 0; i--) {
      res += text.substring(i - 1, i);
    }
    return res;
  }

}