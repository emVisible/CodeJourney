public class Main {
    public static void main(String[] args) {
        // 创建Builder
        CharacterBuilder builder = new CharacterBuilder();
        // 创建director
        Director director = new Director(builder);
        // 通过director创建角色
        director.buildDefaultMale();
        // 通过builder获取角色
        Character characterMale = builder.getCharacter();
        characterMale.getCharacterMsg();

        director.buildDefaultFemale();
        Character characterFemale = builder.getCharacter();
        characterFemale.getCharacterMsg();
    }
}