import component.*;

public class Character {
    public Gender gender;
    public Hair hair;
    public Cloth cloth;
    public Face face;
    Character (Gender gender, Face face, Hair hair, Cloth cloth){
        this.gender = gender;
        this.face = face;
        this.hair = hair;
        this.cloth = cloth;
    }
    public void getCharacterMsg(){
        String msg = ("\n" + "性别" + "\n" + this.gender + "\n") +
                ("头发" + "\n" + this.hair.getHairMsg() +  "\n") +
                ("衣服" + "\n" + this.cloth.getClothMsg() + "\n") +
                ("脸庞" + "\n" + this.face.getFaceMsg() + "\n")  + "\n";
        System.out.println(msg);
    }
}
