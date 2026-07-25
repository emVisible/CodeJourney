public class App {
    public static void main(String[] args) throws Exception {
      Cipher simpleCipher = new SimpleCipher();
      Cipher advancedCipher = new AdvancedCipher(simpleCipher);
      Cipher complexCipher = new ComplexCipher(simpleCipher);

      String text = "Zhejiang International Studies University";
      String simpleRes = simpleCipher.encrypt(text);
      System.out.println(simpleRes);

      String advanceRes = advancedCipher.encrypt(text);
      System.out.println(advanceRes);

      String complexRes = complexCipher.encrypt(text);
      System.out.println(complexRes);

    }
}
