public class BMWCarFactory extends CarFactory{
    @Override
    public Car createCar() {
        return new BMWCar();
    }
}
