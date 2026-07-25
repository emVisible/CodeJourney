import java.util.ArrayList;

public abstract class Subject {
  protected ArrayList<Observer> observers = new ArrayList<>();

  public void attach(Observer obs) {
    this.observers.add(obs);
    System.out.println("Add OK");
  }

  public void detach(Observer obs) {
    this.observers.remove(obs);
    System.out.println("Remove OK");
  }

  public void cry() {
    for (Observer obj: this.observers) {
      obj.response();
    }
  }
}