public class Cat extends Subject {

  @Override
  public void cry() {
    System.out.println("Cat crying");
    super.cry();
  }
}