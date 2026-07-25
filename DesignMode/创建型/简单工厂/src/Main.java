import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Car benzCar = new BenzCarFactory().createCar();
        Car bmwCar = new BMWCarFactory().createCar();
        ArrayList<Car> carList = new ArrayList<>();
        carList.add(benzCar);
        carList.add(bmwCar);
        for (Car car: carList) {
            car.run();
        }
    }
}