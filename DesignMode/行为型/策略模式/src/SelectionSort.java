import java.util.Arrays;

public class SelectionSort implements Sort {

  @Override
  public int[] sort(int[] arr) {
    System.out.println("Selection Sort");
    int[] res = Arrays.copyOf(arr, arr.length);
    for (int i = 0; i < res.length - 1; i ++ ) {
      int minIndex = i;
      for (int j = i+1; j < res.length; j++) {
        if (res[j] < res[minIndex]) {
          minIndex = j;
        }
      }
      int tmp = res[i];
      res[i] = res[minIndex];
      res[minIndex] = tmp;
    }
    return res;
  }
}