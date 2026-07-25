import component.*;

public class Director {
    public CharacterBuilder builder;
    Director(CharacterBuilder builder){
        this.builder = builder;
    }
    public void buildDefaultMale(){
        this.builder.setCharacter(
                Gender.MALE,
                new Face("圆脸", "适中", "适中"),
                new Hair("黑色", "短", "细"),
                new Cloth("夹克","黑色")
        );
    }
    public void buildDefaultFemale(){
        this.builder.setCharacter(
                Gender.FEMALE,
                new Face("尖脸", "长", "适中"),
                new Hair("金色", "长", "细"),
                new Cloth("裙子", "蓝色")
        );
    }
}
