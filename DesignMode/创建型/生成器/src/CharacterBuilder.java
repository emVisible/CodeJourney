import component.*;

public class CharacterBuilder implements Builder {
    public Gender gender;
    public Cloth cloth;
    public Face face;
    public Hair hair;
    @Override
    public Character getCharacter() {
        return new Character(this.gender,  this.face, this.hair, this.cloth);
    }


    @Override
    public void setCharacter(Gender gender, Face face, Hair hair, Cloth cloth){
        try {
            this.cloth = cloth;
            this.gender = gender;
            this.face = face;
            this.hair = hair;
        } catch(Exception e) {
            System.out.println("设置失败");
            e.getStackTrace();
        }
    }

}
