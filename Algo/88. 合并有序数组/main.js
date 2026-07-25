function merge(nums1, m, nums2, n) {
    if (m == 0 && n == 0) {
        nums1.length = 0;
    }
    ;
    if (m == 0) {
        nums1.length = 0;
        nums2.forEach(item => {
            nums1.push(item);
        });
    }
    else {
        const sub1 = nums1.length == m ? nums1 : nums1.splice(m, nums1.length - m);
        const sub2 = nums2.length == n ? nums1.push(...nums2) : nums1.push(...nums2.splice(n, nums2.length - n));
        nums1.sort((a, b) => {
            return a - b;
        });
    }
    console.log(nums1);
}
;
function merge2(nums1, m, nums2, n) {
    const arr = new Array(m + n).fill(0);
    let point1 = 0;
    let point2 = 0;
    let tmp;
    while (point1 < m || point2 < n) {
        if (point1 == m) {
            tmp = nums2[point2++];
        }
        else if (point2 == n) {
            tmp = nums1[point1++];
        }
        else {
            if (nums1[point1] < nums2[point2])
                tmp = nums1[point1++];
            else
                tmp = nums2[point2++];
        }
        arr[point1 + point2 - 1] = tmp;
    }
    for (let i = 0; i < m + n; i++) {
        nums1[i] = arr[i];
    }
}
function merge3(nums1, m, nums2, n) {
    let point1 = m - 1;
    let point2 = n - 1;
    let tail = m + n - 1;
    let tmp;
    while (point1 >= 0 || point2 >= 0) {
        if (point1 == -1) {
            tmp = nums2[point2--];
        }
        else if (point2 == -1) {
            tmp = nums1[point1--];
        }
        else {
            if (nums1[point1] > nums2[point2])
                tmp = nums2[point2--];
            else
                tmp = nums1[point1--];
        }
        nums1[tail--] = tmp;
    }
}
