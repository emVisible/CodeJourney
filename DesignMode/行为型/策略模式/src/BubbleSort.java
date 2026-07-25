import java.util.Arrays;

public class BubbleSort implements Sort {

  @Override
  public int[] sort(int[] arr) {
    System.out.println("Bubble Sort");
    int[] res = Arrays.copyOf(arr, arr.length);
    for (int i = 1; i < res.length; i++) {
      for (int j = 0; j < res.length - i; j++) {
        if (res[j] > res[j + 1] ) {
          int tmp = res[j];
          res[j] = res[j + 1];
          res[j + 1] = tmp;
        }
      }
    }
    return res;
  }
}