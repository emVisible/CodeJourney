public class CipherDecorator implements Cipher {
  public Cipher cipher;

  CipherDecorator(Cipher cipher) {
    this.cipher = cipher;
  }

  @Override
  public String encrypt(String plainText) {
    return cipher.encrypt(plainText);
  }
}