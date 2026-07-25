public class Client {
  public static void display(Television tv) {
    TVIterator iter = tv.createIterator();
    for (; !iter.isLast(); iter.next()) {
      Object res = iter.currentChannel();
      System.out.println(res);
    }
    System.out.println("遍历完毕");
  }
}
