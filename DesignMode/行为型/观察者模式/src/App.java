public class App {
    public static void main(String[] args) throws Exception {
      Mouse mouse = new Mouse();
      Dog dog = new Dog();

      Cat cat = new Cat();

      cat.attach(mouse);
      cat.attach(dog);
      cat.cry();

      cat.detach(dog);
      cat.detach(mouse);
      cat.cry();
    }
}
