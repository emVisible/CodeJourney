public class App {
  public static void main(String[] args) throws Exception {
    int[] arr = { 2, 3, 12, 5, 125, 23, 643, 6, 3, 235, 1, 34 };

    Sort bubble = new BubbleSort();
    Sort selection = new SelectionSort();
    Sort insert = new InsertSort();

    ArrayHandler handler = new ArrayHandler();
    handler.setSort(bubble);
    int resBubble[] = handler.sort(arr);
    for (int r : resBubble) {
      System.out.print(r + "_");
    }


    handler.setSort(selection);
    int[] resSelection = handler.sort(arr);
    for (int r : resSelection) {
      System.out.print(r + "_");
    }

    handler.setSort(insert);
    int[] resInsert = handler.sort(arr);
    for (int r : resInsert) {
      System.out.print(r + "_");
    }
  }
}
